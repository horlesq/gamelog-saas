"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getAnalytics } from "@/lib/client/analytics";
import { getCurrentUser } from "@/lib/auth/client";
import { Gamepad2, TrendingUp, Crown, BarChart3 } from "lucide-react";
import { AnalyticsData } from "@/components/analytics/types";
import AnalyticsSummaryCards from "@/components/analytics/AnalyticsSummaryCards";
import StatusBreakdownChart from "@/components/analytics/StatusBreakdownChart";
import HorizontalBarChart from "@/components/analytics/HorizontalBarChart";
import RatingDistributionChart from "@/components/analytics/RatingDistributionChart";
import ReleaseYearChart from "@/components/analytics/ReleaseYearChart";
import TopRatedGames from "@/components/analytics/TopRatedGames";

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [userPlan, setUserPlan] = useState<"FREE" | "PRO" | "ULTRA">("FREE");
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            try {
                // Fetch user plan first
                const userData = await getCurrentUser();
                const plan = userData.user?.plan || "FREE";
                setUserPlan(plan);

                // Only fetch analytics if user has access
                if (plan === "PRO" || plan === "ULTRA") {
                    const analytics = await getAnalytics();
                    setData(analytics);
                }
            } catch (error) {
                console.error("Failed to fetch analytics:", error);
                if (error instanceof Error && error.message.includes("401")) {
                    router.push("/login");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <Skeleton key={i} className="h-24 rounded-xl" />
                        ))}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <Skeleton key={i} className="h-72 rounded-xl" />
                        ))}
                    </div>
                </main>
            </div>
        );
    }

    // Upgrade gate for free users
    const isPaidUser = userPlan === "PRO" || userPlan === "ULTRA";

    if (!isPaidUser) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="rounded-2xl border border-border/40 bg-card/40 p-8 text-center">
                        <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                            Upgrade to unlock Analytics
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
                            Get detailed insights into your gaming library with
                            charts for genres, platforms, ratings, and more.
                            Available on Pro and Ultra plans.
                        </p>
                        <Link href="/billing">
                            <Button className="gap-2">
                                <Crown className="h-4 w-4" />
                                Upgrade Plan
                            </Button>
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                    <div className="text-center py-16 text-muted-foreground">
                        <Gamepad2 className="h-12 w-12 mx-auto mb-3 opacity-50" />
                        <p className="text-lg">
                            Failed to load analytics data.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    const hasData = data.summary.totalGames > 0;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {!hasData ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <Gamepad2 className="h-16 w-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-medium mb-2">No data yet</p>
                        <p className="text-sm">
                            Start adding games to your library to see analytics.
                        </p>
                    </div>
                ) : (
                    <>
                        <AnalyticsSummaryCards summary={data.summary} />

                        {/* Charts Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 [&>*:nth-child(odd):last-child]:col-span-1 lg:[&>*:nth-child(odd):last-child]:col-span-2">
                            <StatusBreakdownChart data={data.statusBreakdown} />

                            <HorizontalBarChart
                                title="Top Genres"
                                data={data.genreDistribution}
                            />

                            <HorizontalBarChart
                                title="Platforms"
                                data={data.platformDistribution}
                            />

                            <RatingDistributionChart
                                data={data.ratingDistribution}
                            />

                            <ReleaseYearChart
                                data={data.releaseYearDistribution}
                            />

                            <HorizontalBarChart
                                title="Top Developers"
                                data={data.developerDistribution}
                                yAxisWidth={120}
                                marginLeft={10}
                            />

                            <TopRatedGames games={data.topRatedGames} />
                        </div>

                        {/* Extra stats footer */}
                        <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm text-muted-foreground">
                            {data.summary.avgHoursPerGame > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <TrendingUp className="h-4 w-4" />
                                    <span>
                                        Avg{" "}
                                        <span className="font-semibold text-foreground">
                                            {data.summary.avgHoursPerGame}h
                                        </span>{" "}
                                        per game
                                    </span>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
