import { prisma } from "../db";
import { Plan } from "@prisma/client";
import { Polar } from "@polar-sh/sdk";

/**
 * Subscription Service - Handles plan limits, Polar.sh checkout sessions, and subscription management.
 */

const PLAN_LIMITS: Record<Plan, number> = {
    FREE: 25,
    PRO: 500,
    ULTRA: 10000,
};

// Lazy-init Polar client
let _polar: Polar | null = null;
function getPolar(): Polar {
    if (!_polar) {
        _polar = new Polar({
            accessToken: process.env.POLAR_ACCESS_TOKEN ?? "",
        });
    }
    return _polar;
}

export class SubscriptionService {
    /**
     * Get the game limit for a given plan.
     */
    static getGameLimit(plan: Plan): number {
        return PLAN_LIMITS[plan];
    }

    /**
     * Check if a user can add another game based on their plan limit.
     */
    static async canAddGame(userId: string): Promise<{
        allowed: boolean;
        current: number;
        limit: number;
        plan: Plan;
    }> {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { plan: true },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const limit = this.getGameLimit(user.plan);
        const current = await prisma.gameLog.count({ where: { userId } });

        return {
            allowed: current < limit,
            current,
            limit,
            plan: user.plan,
        };
    }

    /**
     * Map a Polar product ID to a Plan enum value.
     */
    static mapProductToPlan(productId: string): Plan | null {
        const proId = process.env.POLAR_PRO_PRODUCT_ID || "";
        const ultraId = process.env.POLAR_ULTRA_PRODUCT_ID || "";

        if (productId === proId) return Plan.PRO;
        if (productId === ultraId) return Plan.ULTRA;
        return null;
    }

    /**
     * Get the Polar product ID for a given plan.
     */
    static getProductIdForPlan(plan: "PRO" | "ULTRA"): string {
        if (plan === "PRO") return process.env.POLAR_PRO_PRODUCT_ID || "";
        if (plan === "ULTRA") return process.env.POLAR_ULTRA_PRODUCT_ID || "";
        return "";
    }

    /**
     * Create a Polar checkout session for upgrading a user's plan.
     * Returns the checkout URL that the user should be redirected to.
     */
    static async createCheckoutSession(
        userId: string,
        plan: "PRO" | "ULTRA",
        successUrl: string,
    ): Promise<string> {
        const polar = getPolar();
        const productId = this.getProductIdForPlan(plan);

        if (!productId) {
            throw new Error(`No product ID configured for plan: ${plan}`);
        }

        // Get user email to pre-fill checkout
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { email: true },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const checkout = await polar.checkouts.create({
            products: [productId],
            successUrl,
            customerEmail: user.email,
            metadata: {
                userId,
                plan,
            },
        });

        return checkout.url;
    }

    /**
     * Activate a subscription for a user based on a Polar event.
     */
    static async activateSubscription(
        userId: string,
        subscriptionId: string,
        productId: string,
        customerId: string | null,
    ) {
        const plan = this.mapProductToPlan(productId);
        if (!plan) {
            throw new Error(`Unknown product ID: ${productId}`);
        }

        return prisma.user.update({
            where: { id: userId },
            data: {
                plan,
                polarSubscriptionId: subscriptionId,
                polarProductId: productId,
                polarCustomerId: customerId,
                planUpdatedAt: new Date(),
            },
        });
    }

    /**
     * Cancel a subscription — revert the user back to FREE.
     */
    static async cancelSubscription(userId: string) {
        return prisma.user.update({
            where: { id: userId },
            data: {
                plan: Plan.FREE,
                polarSubscriptionId: null,
                polarProductId: null,
                planUpdatedAt: new Date(),
            },
        });
    }

    /**
     * Find a user by their Polar subscription ID.
     */
    static async findUserBySubscriptionId(subscriptionId: string) {
        return prisma.user.findUnique({
            where: { polarSubscriptionId: subscriptionId },
        });
    }

    /**
     * Get subscription info for a user.
     */
    static async getSubscriptionInfo(userId: string) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                plan: true,
                polarSubscriptionId: true,
                polarProductId: true,
                polarCustomerId: true,
                planUpdatedAt: true,
            },
        });

        if (!user) {
            throw new Error("User not found");
        }

        const limit = this.getGameLimit(user.plan);
        const current = await prisma.gameLog.count({ where: { userId } });

        return {
            plan: user.plan,
            gameLimit: limit,
            gamesUsed: current,
            polarCustomerId: user.polarCustomerId,
            planUpdatedAt: user.planUpdatedAt,
            hasActiveSubscription: user.plan !== Plan.FREE,
        };
    }
}
