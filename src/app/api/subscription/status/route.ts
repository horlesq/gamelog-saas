import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { SubscriptionService } from "@/lib/services/subscription-service";

export async function GET() {
    try {
        const user = await requireAuth();

        const subscriptionInfo = await SubscriptionService.getSubscriptionInfo(
            user.userId,
        );

        return NextResponse.json(subscriptionInfo);
    } catch (error) {
        console.error("Get subscription status error:", error);

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
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
