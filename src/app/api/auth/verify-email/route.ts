import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const token = searchParams.get("token");

        if (!token) {
            return NextResponse.redirect(
                new URL("/login?error=MissingToken", request.url),
            );
        }

        const verificationToken = await prisma.verificationToken.findUnique({
            where: { token },
        });

        if (!verificationToken) {
            return NextResponse.redirect(
                new URL("/login?error=InvalidToken", request.url),
            );
        }

        if (new Date() > verificationToken.expires) {
            return NextResponse.redirect(
                new URL("/login?error=TokenExpired", request.url),
            );
        }

        // Token valid! Mark user as verified
        const user = await prisma.user.update({
            where: { email: verificationToken.identifier },
            data: { emailVerified: new Date() },
        });

        // Delete the token
        await prisma.verificationToken.delete({
            where: { id: verificationToken.id },
        });

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
        console.error("Verification error:", error);
        return NextResponse.redirect(
            new URL("/login?error=VerificationFailed", request.url),
        );
    }
}
