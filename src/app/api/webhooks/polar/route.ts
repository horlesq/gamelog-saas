import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { SubscriptionService } from "@/lib/services/subscription-service";
import crypto from "crypto";

/**
 * Polar.sh Webhook Endpoint
 *
 * Receives events from Polar.sh for subscription lifecycle management.
 * Uses manual Standard Webhooks signature verification to avoid
 * the SDK's strict event parsing which fails on unknown event/benefit types.
 *
 * Events handled:
 * - subscription.created → activate subscription
 * - subscription.updated → update plan if product changed
 * - subscription.canceled → revert to FREE
 * - subscription.revoked → revert to FREE
 * - order.created → activate subscription (fallback)
 */

// Verify Standard Webhooks signature (HMAC-SHA256)
function verifyWebhookSignature(
    body: string,
    headers: Record<string, string>,
    secret: string,
): boolean {
    const msgId = headers["webhook-id"];
    const msgTimestamp = headers["webhook-timestamp"];
    const msgSignature = headers["webhook-signature"];

    if (!msgId || !msgTimestamp || !msgSignature) {
        return false;
    }

    // Check timestamp (reject webhooks older than 5 minutes)
    const now = Math.floor(Date.now() / 1000);
    const ts = parseInt(msgTimestamp, 10);
    if (isNaN(ts) || Math.abs(now - ts) > 300) {
        return false;
    }

    // The secret from Polar starts with "whsec_" — strip that prefix and base64 decode
    const secretBytes = Buffer.from(
        secret.startsWith("whsec_") ? secret.slice(6) : secret,
        "base64",
    );

    // Standard Webhooks: sign "msg_id.timestamp.body"
    const signedContent = `${msgId}.${msgTimestamp}.${body}`;
    const expectedSignature = crypto
        .createHmac("sha256", secretBytes)
        .update(signedContent)
        .digest("base64");

    // The header may contain multiple signatures separated by spaces, each prefixed with "v1,"
    const signatures = msgSignature.split(" ");
    for (const sig of signatures) {
        const [version, signature] = sig.split(",");
        if (version === "v1" && signature === expectedSignature) {
            return true;
        }
    }

    return false;
}

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

        if (!verifyWebhookSignature(body, headers, webhookSecret)) {
            console.error("[Polar Webhook] Signature verification failed");
            return NextResponse.json(
                { error: "Invalid webhook signature" },
                { status: 403 },
            );
        }

        // Parse event loosely — don't use SDK's strict validateEvent
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const event = JSON.parse(body) as { type: string; data: any };

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
