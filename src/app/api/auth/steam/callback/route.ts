import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function GET(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const searchParams = url.searchParams;

        // Verify the OpenID response with Steam
        const verifyParams = new URLSearchParams();
        searchParams.forEach((value, key) => {
            if (key !== "openid.mode") {
                verifyParams.append(key, value);
            }
        });
        verifyParams.append("openid.mode", "check_authentication");

        const verifyResponse = await fetch(
            "https://steamcommunity.com/openid/login",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: verifyParams.toString(),
            },
        );

        const verifyText = await verifyResponse.text();

        if (!verifyText.includes("is_valid:true")) {
            console.error("Steam OpenID signature verification failed");
            return NextResponse.redirect(
                new URL("/login?error=SteamOAuthFailed", request.url),
            );
        }

        // Extract SteamID64 from claimed_id
        const claimedId = searchParams.get("openid.claimed_id");
        if (!claimedId) {
            return NextResponse.redirect(
                new URL("/login?error=SteamOAuthFailed", request.url),
            );
        }

        const steamIdMatch = claimedId.match(
            /https?:\/\/steamcommunity\.com\/openid\/id\/(\d+)/,
        );
        const steamId = steamIdMatch ? steamIdMatch[1] : null;

        if (!steamId) {
            return NextResponse.redirect(
                new URL("/login?error=SteamOAuthFailed", request.url),
            );
        }

        // Now fetch user details from Steam Web API
        const STEAM_API_KEY = process.env.STEAM_WEB_API_KEY;
        if (!STEAM_API_KEY) {
            return NextResponse.json(
                { error: "Steam API Key is not configured." },
                { status: 500 },
            );
        }

        const profileResponse = await fetch(
            `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${STEAM_API_KEY}&steamids=${steamId}`,
        );
        const profileData = await profileResponse.json();
        const steamProfile = profileData.response?.players?.[0];

        if (!steamProfile) {
            return NextResponse.redirect(
                new URL("/login?error=SteamOAuthFailed", request.url),
            );
        }

        // Since Steam doesn't provide email by default via OpenID, we have to generate a placeholder
        // or just leave it blank if Prisma allows optional emails (in our case it's @unique, so we need a placeholder)
        const placeholderEmail = `steam_${steamId}@example.com`;

        // Check if user exists by steamId
        let user = await prisma.user.findUnique({
            where: { steamId },
        });

        if (!user) {
            // See if user somehow signed up with that placeholder email
            user = await prisma.user.findUnique({
                where: { email: placeholderEmail },
            });

            if (user && !user.steamId) {
                user = await prisma.user.update({
                    where: { id: user.id },
                    data: {
                        steamId,
                        emailVerified: user.emailVerified || new Date(),
                    },
                });
            } else if (!user) {
                // Completely new user!
                user = await prisma.user.create({
                    data: {
                        email: placeholderEmail,
                        name: steamProfile.personaname,
                        steamId: steamId,
                        emailVerified: new Date(),
                        isAdmin: false,
                    },
                });
            }
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
        console.error("Steam Callback Error:", error);
        return NextResponse.redirect(
            new URL("/login?error=SteamOAuthFailed", request.url),
        );
    }
}
