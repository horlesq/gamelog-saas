import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { SubscriptionService } from "@/lib/services/subscription-service";

/**
 * Subscription Cancel API — immediately revokes the subscription via Polar
 * and reverts the user to the FREE plan.
 */
export async function POST() {
    try {
        const user = await requireAuth();

        await SubscriptionService.cancelSubscriptionAtPeriodEnd(user.userId);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Cancel error:", error);

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
            error.message === "No active subscription to cancel"
        ) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(
            { error: "Failed to cancel subscription" },
            { status: 500 },
        );
    }
}
