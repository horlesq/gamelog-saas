import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { SubscriptionService } from "@/lib/services/subscription-service";

/**
 * Subscription Upgrade API — changes an existing subscription to a new plan.
 * Uses Polar's subscription update API (proration handled automatically).
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

        await SubscriptionService.upgradeSubscription(user.userId, plan);

        return NextResponse.json({ success: true, plan });
    } catch (error) {
        console.error("Upgrade error:", error);

        if (
            error instanceof Error &&
            error.message === "Authentication required"
        ) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 },
            );
        }

        if (
            error instanceof Error &&
            error.message === "No active subscription to upgrade"
        ) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(
            { error: "Failed to upgrade subscription" },
            { status: 500 },
        );
    }
}
