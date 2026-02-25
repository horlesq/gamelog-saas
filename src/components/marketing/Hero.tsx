import Link from "next/link";
import Image from "next/image";
import { FloatingIcon } from "./FloatingIcon";
import { Button } from "@/components/ui/button";
import {
    GitPullRequest,
    Sparkles,
    Server,
    Star,
    Rocket,
} from "lucide-react";

export default function Hero() {
    return (
        <section className="relative flex flex-col items-center justify-center px-6 pt-6 md:pt-8 lg:pt-12 xl:pt-16 text-center">
            {/* ── Background glows ── */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-1/4 h-[700px] w-[700px] -translate-x-1 -translate-y-2/3 rounded-full bg-primary/10 blur-[160px]" />
                {/* <div className="absolute right-1/4 top-2/3 h-[500px] w-[500px] rounded-full bg-accent/30 blur-[140px]" /> */}
                {/* <div className="absolute left-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-secondary/30 blur-[120px]" /> */}
            </div>

            {/* ── Headline ── */}
            <h1 className="mt-6 max-w-5xl text-5xl font-extrabold uppercase tracking-tight sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95]">
                Track your{" "}
                <span className="bg-gradient-to-r from-accent via-accent to-yellow-300 bg-clip-text text-transparent">
                    gaming
                </span>{" "}
                journey.
            </h1>

            {/* ── Subheadline ── */}
            <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg font-mono tracking-wide uppercase leading-relaxed">
                Log your games, manage your backlog, rate your playthroughs, and
                track your platforms — all in one place.
            </p>

            {/* ── CTA Buttons ── */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                {/* Primary CTA - Glassmorphic with corner brackets */}
                <Button asChild variant="premium" size="xl">
                    <Link href="/register">
                        <span>START FOR FREE</span>
                    </Link>
                </Button>

                {/* Secondary CTA */}
                <Button asChild variant="premiumAccent" size="xl">
                    <Link
                        href="https://github.com/horlesq/gamelog"
                        target="_blank"
                    >
                        <span>VIEW ON GITHUB</span>
                        <GitPullRequest className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </Button>
            </div>

            {/* ── Tagline ── */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs tracking-[0.15em] text-muted-foreground">
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                        <Sparkles className="size-3.5" /> Free Tier
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40"></span>
                    <span className="flex items-center gap-1.5">
                        <Rocket className="size-3.5" /> Easy setup
                    </span>
                </div>
                <span className="hidden sm:block font-black text-muted-foreground/60">
                    |
                </span>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                        <Server className="size-3.5" /> Self-hostable
                    </span>
                    <span className="h-1 w-1 rounded-full bg-muted-foreground/40"></span>
                    <span className="flex items-center gap-1.5">
                        <Star className="size-3.5" /> Star on GitHub
                    </span>
                </div>
            </div>

            {/* ── Dashboard Preview ── */}
            <div className="relative mt-16 w-full max-w-7xl">
                {/* Top border glow */}
                <div className="absolute -top-px left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />

                <div className="relative overflow-hidden rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm shadow-2xl shadow-primary/5">
                    <Image
                        src="/assets/dashboard-preview.png"
                        alt="GameLog Dashboard Preview"
                        width={2280}
                        height={1414}
                        className="w-full h-auto object-cover object-top"
                        priority
                    />

                    {/* Bottom fade overlay */}
                    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
                </div>

                {/* ── Floating 3D Icons ── */}
                <FloatingIcon
                    className="absolute -left-8 md:-left-10 lg:-left-15 xl:-left-20 -top-10 w-28 h-28 sm:w-32 sm:h-32 md:w-44 md:h-44 lg:w-68 xl:w-80 lg:h-68 xl:h-80 pointer-events-none"
                    yOffset={-20}
                    duration={6}
                >
                    <Image
                        src="/3d/bookmark-fav.png"
                        alt=""
                        width={440}
                        height={440}
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </FloatingIcon>
                <FloatingIcon
                    className="absolute -right-4 top-1/3 w-20 h-20 sm:w-28 sm:h-28 md:w-36 md:h-36 lg:w-54 lg:h-54 xl:w-68 xl:h-68 pointer-events-none"
                    yOffset={20}
                    duration={6}
                >
                    <Image
                        src="/3d/trophy.png"
                        alt=""
                        width={440}
                        height={440}
                        className="w-full h-full object-contain drop-shadow-2xl"
                    />
                </FloatingIcon>
            </div>
        </section>
    );
}
