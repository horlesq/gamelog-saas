import { NextResponse } from "next/server";

export async function GET() {
    const NEXT_PUBLIC_APP_URL =
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const returnTo = `${NEXT_PUBLIC_APP_URL}/api/auth/steam/callback`;
    const realm = NEXT_PUBLIC_APP_URL;

    // Steam OpenID 2.0 parameters
    const params = new URLSearchParams({
        "openid.ns": "http://specs.openid.net/auth/2.0",
        "openid.mode": "checkid_setup",
        "openid.return_to": returnTo,
        "openid.realm": realm,
        "openid.identity": "http://specs.openid.net/auth/2.0/identifier_select",
        "openid.claimed_id":
            "http://specs.openid.net/auth/2.0/identifier_select",
    });

    const steamAuthUrl = `https://steamcommunity.com/openid/login?${params.toString()}`;

    return NextResponse.redirect(steamAuthUrl);
}
