import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const code = searchParams.get("code");
        const error = searchParams.get("error");

        if (error || !code) {
            return NextResponse.redirect(
                new URL("/login?error=GoogleOAuthFailed", request.url),
            );
        }

        const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
        const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
        const NEXT_PUBLIC_APP_URL =
            process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

        if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
            return NextResponse.json(
                { error: "Google OAuth is not configured." },
                { status: 500 },
            );
        }

        const redirectUri = `${NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;

        // Exchange code for access token
        const tokenResponse = await fetch(
            "https://oauth2.googleapis.com/token",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    client_id: GOOGLE_CLIENT_ID,
                    client_secret: GOOGLE_CLIENT_SECRET,
                    code,
                    grant_type: "authorization_code",
                    redirect_uri: redirectUri,
                }),
            },
        );

        const tokenData = await tokenResponse.json();

        if (tokenData.error) {
            console.error("Google Token Error:", tokenData.error);
            return NextResponse.redirect(
                new URL("/login?error=GoogleOAuthFailed", request.url),
            );
        }

        // Fetch user profile from Google
        const userResponse = await fetch(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            {
                headers: {
                    Authorization: `Bearer ${tokenData.access_token}`,
                },
            },
        );

        const googleUser = await userResponse.json();

        if (!googleUser.email) {
            return NextResponse.redirect(
                new URL("/login?error=NoEmailProvided", request.url),
            );
        }

        // Check if user exists
        let user = await prisma.user.findUnique({
            where: { email: googleUser.email },
        });

        if (user) {
            // Link Google account to existing user if not already linked
            if (!user.googleId) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        googleId: googleUser.id,
                        emailVerified: user.emailVerified || new Date(), // Auto verify if they came through Google
                    },
                });
            }
        } else {
            // Create a new user since they don't exist
            user = await prisma.user.create({
                data: {
                    email: googleUser.email,
                    name: googleUser.name,
                    googleId: googleUser.id,
                    emailVerified: new Date(), // Google emails are pre-verified
                    isAdmin: false,
                },
            });
        }

        // Log the user in
        const jwtToken = jwt.sign(
            {
                userId: user.id,
                email: user.email,
                isAdmin: user.isAdmin,
                plan: user.plan,
            },
            JWT_SECRET,
            { expiresIn: "7d" },
        );

        const cookieStore = await cookies();
        cookieStore.set("auth-token", jwtToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.redirect(new URL("/dashboard", request.url));
    } catch (error) {
        console.error("Google Callback Error:", error);
        return NextResponse.redirect(
            new URL("/login?error=GoogleOAuthFailed", request.url),
        );
    }
}
