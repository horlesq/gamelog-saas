import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { SubscriptionService } from "@/lib/services/subscription-service";

/**
 * Checkout API — creates a Polar checkout session for the authenticated user.
 * The frontend redirects the user to the returned URL.
 */
export async function POST(request: NextRequest) {
    try {
        const user = await requireAuth();
        const body = await request.json();
        const { plan } = body;

        if (plan !== "PRO" && plan !== "ULTRA") {
            return NextResponse.json(
                { error: "Invalid plan. Must be PRO or ULTRA." },
                { status: 400 },
            );
        }

        // Build the success URL that Polar will redirect to after payment
        const origin = request.headers.get("origin") || "http://localhost:3000";
        const successUrl = `${origin}/billing?success=true`;

        const checkoutUrl = await SubscriptionService.createCheckoutSession(
            user.userId,
            plan,
            successUrl,
        );

        return NextResponse.json({ url: checkoutUrl });
    } catch (error) {
        console.error("Checkout error:", error);

        if (
            error instanceof Error &&
            error.message === "Authentication required"
        ) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 },
            );
        }

        return NextResponse.json(
            { error: "Failed to create checkout session" },
            { status: 500 },
        );
    }
}
