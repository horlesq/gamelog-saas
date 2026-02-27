import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SubscriptionService } from "@/lib/services/subscription-service";
import {
    validateEvent,
    WebhookVerificationError,
} from "@polar-sh/sdk/webhooks";

/**
 * Polar.sh Webhook Endpoint
 *
 * Receives events from Polar.sh for subscription lifecycle management.
 * Uses Standard Webhooks with signature verification.
 *
 * Events handled:
 * - subscription.created → activate subscription
 * - subscription.updated → update plan if product changed
 * - subscription.canceled → revert to FREE
 * - subscription.revoked → revert to FREE
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.text();
        const headers: Record<string, string> = {};
        request.headers.forEach((value, key) => {
            headers[key] = value;
        });

        // Validate webhook signature
        const webhookSecret = process.env.POLAR_WEBHOOK_SECRET;
        if (!webhookSecret) {
            console.error("[Polar Webhook] POLAR_WEBHOOK_SECRET is not set");
            return NextResponse.json(
                { error: "Webhook secret not configured" },
                { status: 500 },
            );
        }

        let event: ReturnType<typeof validateEvent>;
        try {
            event = validateEvent(body, headers, webhookSecret);
        } catch (error) {
            if (error instanceof WebhookVerificationError) {
                console.error(
                    "[Polar Webhook] Signature verification failed",
                    error,
                );
                return NextResponse.json(
                    { error: "Invalid webhook signature" },
                    { status: 403 },
                );
            }
            throw error;
        }

        console.log("[Polar Webhook] Event received:", event.type);

        // Handle subscription events
        if (
            event.type === "subscription.created" ||
            event.type === "subscription.updated"
        ) {
            const subscription = event.data;
            const subscriptionId = subscription.id;
            const productId = subscription.productId;
            const customerId = subscription.customerId || null;
            const customerEmail = subscription.customer?.email || null;

            // Check if subscription is active
            if (
                subscription.status !== "active" &&
                subscription.status !== "trialing"
            ) {
                console.log(
                    `[Polar Webhook] Subscription ${subscriptionId} status is ${subscription.status}, skipping activation`,
                );
                return NextResponse.json({ success: true });
            }

            // Try to find user by metadata.userId first
            let userId: string | null =
                (subscription.metadata as Record<string, string>)?.userId ||
                null;

            // Fallback: match by email
            if (!userId && customerEmail) {
                const userByEmail = await prisma.user.findUnique({
                    where: { email: customerEmail },
                });
                if (userByEmail) {
                    userId = userByEmail.id;
                    console.log(
                        `[Polar Webhook] Matched user by email: ${customerEmail}`,
                    );
                }
            }

            // Fallback: find user by existing subscription ID
            if (!userId) {
                const existingUser =
                    await SubscriptionService.findUserBySubscriptionId(
                        subscriptionId,
                    );
                if (existingUser) {
                    userId = existingUser.id;
                }
            }

            if (!userId) {
                console.error(
                    `[Polar Webhook] Cannot identify user for subscription ${subscriptionId}`,
                );
                return NextResponse.json(
                    { error: "Cannot identify user" },
                    { status: 400 },
                );
            }

            // Activate / update subscription
            await SubscriptionService.activateSubscription(
                userId,
                subscriptionId,
                productId,
                customerId,
            );

            console.log(
                `[Polar Webhook] Activated subscription for user ${userId} (plan mapped from product ${productId})`,
            );

            return NextResponse.json({ success: true });
        }

        if (
            event.type === "subscription.canceled" ||
            event.type === "subscription.revoked"
        ) {
            const subscription = event.data;
            const subscriptionId = subscription.id;

            // Find user by subscription ID
            const existingUser =
                await SubscriptionService.findUserBySubscriptionId(
                    subscriptionId,
                );
            if (existingUser) {
                await SubscriptionService.cancelSubscription(existingUser.id);
                console.log(
                    `[Polar Webhook] Cancelled subscription for user ${existingUser.id}`,
                );
            } else {
                console.warn(
                    `[Polar Webhook] No user found with subscription ID ${subscriptionId} for cancellation`,
                );
            }

            return NextResponse.json({ success: true });
        }

        // Unhandled event type — acknowledge it
        console.log(`[Polar Webhook] Unhandled event type: ${event.type}`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[Polar Webhook] Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
