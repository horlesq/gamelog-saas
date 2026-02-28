"use client";

import { Suspense, useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import {
    Crown,
    Zap,
    Shield,
    Gamepad2,
    Loader2,
    CheckCircle2,
} from "lucide-react";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";

interface SubscriptionInfo {
    plan: "FREE" | "PRO" | "ULTRA";
    gameLimit: number;
    gamesUsed: number;
    polarCustomerId: string | null;
    planUpdatedAt: string | null;
    hasActiveSubscription: boolean;
}

const PLAN_CONFIG = {
    FREE: {
        label: "Free",
        icon: Shield,
        color: "text-muted-foreground",
        bgColor: "bg-muted/50",
        borderColor: "border-border/40",
        description: "Track up to 25 games with basic features.",
    },
    PRO: {
        label: "Pro",
        icon: Zap,
        color: "text-primary",
        bgColor: "bg-primary/10",
        borderColor: "border-primary/30",
        description: "Track up to 500 games with advanced features.",
    },
    ULTRA: {
        label: "Ultra",
        icon: Crown,
        color: "text-accent",
        bgColor: "bg-accent/10",
        borderColor: "border-accent/30",
        description: "Unlimited tracking and AI-powered recommendations.",
    },
};

export default function BillingPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                    <Loader2 className="size-8 animate-spin text-muted-foreground" />
                </div>
            }
        >
            <BillingContent />
        </Suspense>
    );
}

function BillingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [subscription, setSubscription] = useState<SubscriptionInfo | null>(
        null,
    );
    const [loading, setLoading] = useState(true);
    const [upgrading, setUpgrading] = useState<string | null>(null);
    const showSuccess = searchParams.get("success") === "true";
    const checkoutRef = useRef<ReturnType<
        typeof PolarEmbedCheckout.create
    > | null>(null);

    const fetchSubscription = useCallback(async () => {
        try {
            const res = await fetch("/api/subscription/status");
            if (res.ok) {
                const data = await res.json();
                setSubscription(data);
            }
        } catch (error) {
            console.error("Failed to fetch subscription:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSubscription();
    }, [fetchSubscription]);

    // Clean up checkout instance on unmount
    useEffect(() => {
        return () => {
            if (checkoutRef.current) {
                checkoutRef.current.then((c) => c.close());
            }
        };
    }, []);

    const handleUpgrade = async (plan: "PRO" | "ULTRA") => {
        setUpgrading(plan);
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ plan }),
            });

            if (!res.ok) {
                throw new Error("Failed to create checkout");
            }

            const data = await res.json();

            // Use Polar's official embedded checkout
            const checkoutPromise = PolarEmbedCheckout.create(data.url);

            checkoutRef.current = checkoutPromise;
            const checkout = await checkoutPromise;

            // Listen for successful completion
            checkout.addEventListener("success", () => {
                setUpgrading(null);
                fetchSubscription();
                router.replace("/billing?success=true");
            });

            // Listen for when checkout is closed
            checkout.addEventListener("close", () => {
                setUpgrading(null);
                checkoutRef.current = null;
            });
        } catch (error) {
            console.error("Upgrade error:", error);
            setUpgrading(null);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
                <Loader2 className="size-8 animate-spin text-muted-foreground" />
            </div>
        );
    }

    const plan = subscription?.plan || "FREE";
    const config = PLAN_CONFIG[plan];
    const PlanIcon = config.icon;
    const usagePercent = subscription
        ? Math.min((subscription.gamesUsed / subscription.gameLimit) * 100, 100)
        : 0;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="w-full max-w-4xl mx-auto">
                    <h1 className="font-orbitron font-bold text-3xl sm:text-4xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-2">
                        Billing & Subscription
                    </h1>
                    <p className="text-muted-foreground mb-10">
                        Manage your plan and track your usage.
                    </p>

                    {/* Success Banner */}
                    {showSuccess && (
                        <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 mb-8 flex items-center gap-3">
                            <CheckCircle2 className="size-5 text-green-400 flex-shrink-0" />
                            <div>
                                <p className="text-sm font-medium text-green-300">
                                    Payment successful!
                                </p>
                                <p className="text-xs text-green-400/70">
                                    Your plan may take a few moments to update.
                                    Refresh the page if it hasn&apos;t changed
                                    yet.
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Current Plan Card */}
                    <div
                        className={`rounded-2xl border ${config.borderColor} ${config.bgColor} p-8 mb-8`}
                    >
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-4">
                                <div
                                    className={`flex items-center justify-center w-12 h-12 rounded-xl ${config.bgColor} border ${config.borderColor}`}
                                >
                                    <PlanIcon
                                        className={`size-6 ${config.color}`}
                                    />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <h2 className="text-xl font-bold text-foreground">
                                            {config.label} Plan
                                        </h2>
                                        {subscription?.hasActiveSubscription && (
                                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                                                Active
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        {config.description}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Usage Bar */}
                        {subscription && (
                            <div className="mt-6">
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-muted-foreground flex items-center gap-1.5">
                                        <Gamepad2 className="size-4" />
                                        Games Logged
                                    </span>
                                    <span className="text-foreground font-medium">
                                        {subscription.gamesUsed.toLocaleString()}{" "}
                                        /{" "}
                                        {subscription.gameLimit.toLocaleString()}
                                    </span>
                                </div>
                                <div className="w-full h-2.5 bg-background/50 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-500 ${
                                            usagePercent >= 90
                                                ? "bg-red-500"
                                                : usagePercent >= 70
                                                  ? "bg-yellow-500"
                                                  : "bg-primary"
                                        }`}
                                        style={{ width: `${usagePercent}%` }}
                                    />
                                </div>
                                {usagePercent >= 90 && (
                                    <p className="text-xs text-red-400 mt-2">
                                        You&#39;re running low on your game
                                        limit. Consider upgrading!
                                    </p>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Upgrade Options */}
                    {plan !== "ULTRA" && (
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-foreground">
                                Upgrade Your Plan
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Pro Upgrade */}
                                {plan === "FREE" && (
                                    <div className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Zap className="size-5 text-primary" />
                                            <h4 className="font-bold text-foreground">
                                                Pro
                                            </h4>
                                            <span className="text-sm text-primary font-medium">
                                                $4.99/mo
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Track up to 500 games, advanced
                                            filters, custom collections, and
                                            more.
                                        </p>
                                        <Button
                                            onClick={() => handleUpgrade("PRO")}
                                            disabled={upgrading !== null}
                                            variant="premium"
                                            size="sm"
                                            className="w-full bg-primary/10 border border-primary/30 text-white hover:bg-primary/20"
                                        >
                                            {upgrading === "PRO" ? (
                                                <Loader2 className="size-4 animate-spin" />
                                            ) : (
                                                <span>Upgrade to Pro</span>
                                            )}
                                        </Button>
                                    </div>
                                )}

                                {/* Ultra Upgrade */}
                                <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <Crown className="size-5 text-accent" />
                                        <h4 className="font-bold text-foreground">
                                            Ultra
                                        </h4>
                                        <span className="text-sm text-accent font-medium">
                                            $10.99/mo
                                        </span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Unlimited games, AI recommendations,
                                        automated backlog prioritization, and
                                        CSV export.
                                    </p>
                                    <Button
                                        onClick={() => handleUpgrade("ULTRA")}
                                        disabled={upgrading !== null}
                                        variant="premiumAccent"
                                        size="sm"
                                        className="w-full bg-accent/20 border border-accent/40 text-foreground hover:bg-accent/30"
                                    >
                                        {upgrading === "ULTRA" ? (
                                            <Loader2 className="size-4 animate-spin" />
                                        ) : (
                                            <span>Upgrade to Ultra</span>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <p className="text-xs text-muted-foreground/60">
                                Payments are processed securely by Polar. After
                                purchase, your plan will be activated
                                automatically.
                            </p>
                        </div>
                    )}

                    {/* Active Subscription Info */}
                    {subscription?.hasActiveSubscription && (
                        <div className="mt-8 rounded-2xl border border-border/40 bg-card/40 p-6">
                            <h3 className="text-lg font-semibold text-foreground mb-4">
                                Subscription Details
                            </h3>
                            <div className="space-y-3 text-sm">
                                {subscription.planUpdatedAt && (
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Activated
                                        </span>
                                        <span className="text-foreground">
                                            {new Date(
                                                subscription.planUpdatedAt,
                                            ).toLocaleDateString()}
                                        </span>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-muted-foreground/60 mt-4">
                                To cancel or manage your subscription, visit
                                your Polar account. Your plan will revert to
                                Free after cancellation.
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
