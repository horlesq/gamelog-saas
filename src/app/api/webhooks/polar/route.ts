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
 * Uses the SDK for signature verification but handles event parsing
 * errors gracefully (the SDK is strict and rejects unknown event types).
 *
 * Events handled:
 * - subscription.created → activate subscription
 * - subscription.updated → update plan if product changed
 * - subscription.canceled → revert to FREE
 * - subscription.revoked → revert to FREE
 * - order.created → activate subscription (fallback)
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

        // Try SDK validation first — it verifies signature + parses event
        // If parsing fails (unknown event types, schema mismatches), fall back to raw JSON
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let event: { type: string; data: any };

        try {
            event = validateEvent(body, headers, webhookSecret);
        } catch (error) {
            if (error instanceof WebhookVerificationError) {
                // Signature is invalid — reject
                console.error(
                    "[Polar Webhook] Signature verification failed",
                    error,
                );
                return NextResponse.json(
                    { error: "Invalid webhook signature" },
                    { status: 403 },
                );
            }

            // Parsing error (unknown event type, schema mismatch, etc.)
            // The signature was verified OK, but the event payload doesn't match SDK's strict schema.
            // Fall back to raw JSON parsing.
            console.log(
                "[Polar Webhook] SDK parsing failed, falling back to raw JSON:",
                error instanceof Error ? error.message : error,
            );
            event = JSON.parse(body);
        }

        console.log("[Polar Webhook] Event received:", event.type);

        // Handle subscription events
        if (
            event.type === "subscription.created" ||
            event.type === "subscription.updated" ||
            event.type === "subscription.active"
        ) {
            const subscription = event.data;
            const subscriptionId = subscription.id;
            const productId = subscription.product_id || subscription.productId;
            const customerId =
                subscription.customer_id || subscription.customerId || null;
            const customerEmail =
                subscription.customer?.email ||
                subscription.customer_email ||
                null;

            // Check if subscription is active
            const status = subscription.status;
            if (status !== "active" && status !== "trialing") {
                console.log(
                    `[Polar Webhook] Subscription ${subscriptionId} status is ${status}, skipping activation`,
                );
                return NextResponse.json({ success: true });
            }

            // Try to find user by metadata.userId first
            let userId: string | null = subscription.metadata?.userId || null;

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

        if (event.type === "order.created") {
            const order = event.data;
            const productId = order.product_id || order.productId;
            const userId = order.metadata?.userId || null;

            if (userId && productId) {
                const subscriptionId =
                    order.subscription_id || order.subscriptionId || order.id;

                await SubscriptionService.activateSubscription(
                    userId,
                    subscriptionId,
                    productId,
                    order.customer_id || order.customerId || null,
                );

                console.log(
                    `[Polar Webhook] Activated via order for user ${userId}`,
                );
            }

            return NextResponse.json({ success: true });
        }

        // Unhandled event type — acknowledge it gracefully
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
