"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Gamepad2,
    BarChart3,
    Trophy,
    Flame,
    Star,
    Users,
    Menu,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
    {
        icon: Gamepad2,
        title: "Log Every Game",
        description:
            "Track every game you play across all platforms — PC, PlayStation, Xbox, Nintendo, and more.",
    },
    {
        icon: BarChart3,
        title: "Your Stats, Visualized",
        description:
            "See your gaming habits at a glance. Completion rates, hours played, and favourite genres.",
    },
    {
        icon: Trophy,
        title: "Track Completion",
        description:
            "Mark games as Playing, Completed, or Plan to Play. Never lose track of your backlog again.",
    },
    {
        icon: Flame,
        title: "Discover What's Next",
        description:
            "Get personalized recommendations based on your gaming history and preferences.",
    },
    {
        icon: Star,
        title: "Rate & Review",
        description:
            "Rate games you've finished and write personal notes to remember your experience.",
    },
    {
        icon: Users,
        title: "Share Your Profile",
        description:
            "Share your gaming profile with friends and see what they're playing right now.",
    },
];

const freeTier = ["Up to 50 games", "Basic stats", "Public profile"];
const proTier = [
    "Unlimited games",
    "Advanced analytics",
    "Custom lists",
    "Priority support",
    "Early access to features",
];
const selfHostedTier = [
    "All core features",
    "Your own data",
    "Full control",
    "MIT Licensed",
];

export default function LandingPage() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* ── Navbar ── */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/3d/next.png"
                                alt="GameLog"
                                width={40}
                                height={40}
                                priority
                                className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-200"
                            />
                            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                                Game
                                <span className="text-accent">Log</span>
                            </h1>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                            <Link
                                href="#features"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground px-3 py-2"
                            >
                                Features
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground px-3 py-2"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="https://github.com/horlesq/gamelog"
                                target="_blank"
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground px-3 py-2"
                            >
                                Open Source
                            </Link>
                            <Button
                                asChild
                                className="bg-secondary hover:bg-primary/80 text-white cursor-pointer"
                            >
                                <Link href="/register">Get Started</Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="cursor-pointer"
                            >
                                <Link href="/login">Sign In</Link>
                            </Button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <Button
                                variant="mobile"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                aria-label="Toggle mobile menu"
                                className="h-14 w-14 p-0 shrink-0"
                            >
                                {mobileMenuOpen ? (
                                    <X className="size-6" />
                                ) : (
                                    <Menu className="size-6" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {mobileMenuOpen && (
                        <div className="md:hidden mt-2 pt-2 pb-3 space-y-2">
                            <Link
                                href="#features"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                                Features
                            </Link>
                            <Link
                                href="#pricing"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="https://github.com/horlesq/gamelog"
                                target="_blank"
                                onClick={() => setMobileMenuOpen(false)}
                                className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                                Open Source
                            </Link>
                            <Button
                                asChild
                                className="w-full bg-secondary hover:bg-primary/80 text-white"
                            >
                                <Link href="/register">Get Started</Link>
                            </Button>
                            <Button
                                variant="outline"
                                asChild
                                className="w-full"
                            >
                                <Link href="/login">Sign In</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </nav>

            {/* ── Hero ── */}
            <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-16 text-center">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
                    <div className="absolute right-1/4 top-2/3 h-[400px] w-[400px] rounded-full bg-accent/10 blur-[100px]" />
                </div>

                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm text-primary">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
                    Open-source · Self-hostable · Free forever
                </div>

                <h1 className="mt-6 max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
                    The gaming journal
                    <br />
                    <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                        you&apos;ve always wanted
                    </span>
                </h1>

                <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                    Log every game, track your stats, manage your backlog, and
                    share your gaming journey — all in one place.
                </p>

                <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                    <Link
                        href="/login"
                        className="rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:scale-105 hover:shadow-primary/40"
                    >
                        Start for Free
                    </Link>
                    <Link
                        href="https://github.com/horlesq/gamelog"
                        target="_blank"
                        className="rounded-xl border border-border px-8 py-3.5 text-base font-semibold transition-all hover:bg-card"
                    >
                        Self-host it →
                    </Link>
                </div>
            </section>

            {/* ── Features ── */}
            <section id="features" className="px-6 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Everything you need to track your games
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Built by gamers, for gamers.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {features.map((f) => (
                            <div
                                key={f.title}
                                className="rounded-2xl border border-border/50 bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5"
                            >
                                <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-3">
                                    <f.icon className="h-6 w-6 text-primary" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold">
                                    {f.title}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                    {f.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Pricing ── */}
            <section id="pricing" className="px-6 py-24">
                <div className="mx-auto max-w-5xl">
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Simple, honest pricing
                        </h2>
                        <p className="mt-4 text-muted-foreground">
                            Free to use. Pay only when you need more.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Free */}
                        <div className="rounded-2xl border border-border bg-card p-8">
                            <h3 className="text-lg font-semibold">Free</h3>
                            <div className="mt-4 flex items-end gap-1">
                                <span className="text-4xl font-extrabold">
                                    $0
                                </span>
                                <span className="mb-1 text-muted-foreground">
                                    /month
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Perfect for casual players.
                            </p>
                            <ul className="mt-6 space-y-3 text-sm">
                                {freeTier.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-primary">✓</span>{" "}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/login"
                                className="mt-8 block rounded-lg border border-border px-4 py-2.5 text-center text-sm font-semibold transition-colors hover:bg-muted"
                            >
                                Get started free
                            </Link>
                        </div>

                        {/* Pro */}
                        <div className="relative rounded-2xl border border-primary bg-primary/5 p-8 shadow-xl shadow-primary/10">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
                                Most Popular
                            </div>
                            <h3 className="text-lg font-semibold">Pro</h3>
                            <div className="mt-4 flex items-end gap-1">
                                <span className="text-4xl font-extrabold">
                                    $5
                                </span>
                                <span className="mb-1 text-muted-foreground">
                                    /month
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                For the dedicated gamer.
                            </p>
                            <ul className="mt-6 space-y-3 text-sm">
                                {proTier.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-primary">✓</span>{" "}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="/login"
                                className="mt-8 block rounded-lg bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-opacity hover:opacity-90"
                            >
                                Start Pro trial
                            </Link>
                        </div>

                        {/* Self-host */}
                        <div className="rounded-2xl border border-border bg-card p-8">
                            <h3 className="text-lg font-semibold">
                                Self-Hosted
                            </h3>
                            <div className="mt-4 flex items-end gap-1">
                                <span className="text-4xl font-extrabold">
                                    Free
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">
                                Run it on your own server.
                            </p>
                            <ul className="mt-6 space-y-3 text-sm">
                                {selfHostedTier.map((item) => (
                                    <li
                                        key={item}
                                        className="flex items-center gap-2"
                                    >
                                        <span className="text-primary">✓</span>{" "}
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <Link
                                href="https://github.com/horlesq/gamelog"
                                target="_blank"
                                className="mt-8 block rounded-lg border border-border px-4 py-2.5 text-center text-sm font-semibold transition-colors hover:bg-muted"
                            >
                                View on GitHub →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Footer ── */}
            <footer className="border-t border-border px-6 py-12">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-2">
                        <Image
                            src="/3d/next.png"
                            alt="GameLog"
                            width={24}
                            height={24}
                            className="w-6 h-6 object-contain"
                        />
                        <span className="font-bold">
                            Game<span className="text-accent">Log</span>
                        </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} GameLog. Open-source under
                        MIT License.
                    </p>
                    <div className="flex gap-6 text-sm text-muted-foreground">
                        <Link href="/privacy" className="hover:text-foreground">
                            Privacy
                        </Link>
                        <Link href="/terms" className="hover:text-foreground">
                            Terms
                        </Link>
                        <Link
                            href="https://github.com/horlesq/gamelog"
                            target="_blank"
                            className="hover:text-foreground"
                        >
                            GitHub
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
