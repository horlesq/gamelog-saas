import { NextResponse } from "next/server";

export async function GET() {
    const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const NEXT_PUBLIC_APP_URL =
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    if (!GOOGLE_CLIENT_ID) {
        return NextResponse.json(
            { error: "Google OAuth is not configured." },
            { status: 500 },
        );
    }

    const redirectUri = `${NEXT_PUBLIC_APP_URL}/api/auth/google/callback`;

    // Construct the Google OAuth URL
    const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid email profile",
        access_type: "online",
        prompt: "select_account",
    });

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

    return NextResponse.redirect(googleAuthUrl);
}
