import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const freeFeatures = [
    "Track up to 25 games",
    "Basic tracking (Status, Rating)",
    "Standard lists",
    "Public profile",
];

const proFeatures = [
    "Track up to 500 games",
    "Advanced filters and sorting",
    "Custom collections and lists",
    "Rich text notes for game reviews",
    "Priority support",
];

const ultraFeatures = [
    "UNLIMITED Games",
    'AI "Next Game" Engine',
    "Automated Backlog Prioritization",
    "CSV Data Export/Import",
    "Everything in Pro tier",
];

export default function Pricing() {
    return (
        <section
            id="pricing"
            className="relative w-full bg-background px-6 py-24 md:py-32 overflow-hidden"
        >
            {/* ── Background Glows ── */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
                <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] translate-x-1/4 rounded-full bg-accent/5 blur-[120px]" />
            </div>

            <div className="mx-auto max-w-7xl">
                {/* ── Header ── */}
                <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center mb-16 md:mb-24">
                    <h2 className="font-orbitron font-bold text-3xl sm:text-5xl md:text-6xl/none bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Choose your level.
                    </h2>
                    <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                        Simple, flexible pricing for every type of gamer. Pay
                        only when you need more power.
                    </p>
                </div>

                {/* ── Pricing Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative max-w-6xl mx-auto">
                    {/* Free Tier */}
                    <div className="relative flex flex-col rounded-[2rem] border border-border/40 bg-card/40 p-10 flex-1">
                        <div className="mb-8">
                            <h3 className="font-orbitron font-bold text-xl text-foreground mb-2 text-white/80">
                                FREE
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                The Trial Tier. Perfect for casual players
                                tracking a small rotation.
                            </p>
                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-4xl font-bold font-orbitron text-foreground">
                                    $0
                                </span>
                                <span className="text-muted-foreground text-sm font-medium mb-1">
                                    / mo
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-10 flex-1">
                            {freeFeatures.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-sm text-white/80"
                                >
                                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                        <Check className="w-3.5 h-3.5 text-white/70" />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            asChild
                            variant="glass"
                            size="lg"
                            className="w-full mt-auto"
                        >
                            <Link href="/register">Get Started</Link>
                        </Button>
                    </div>

                    {/* Ultra Tier (Highlighted - Middle position for visual weight) */}
                    <div className="relative flex flex-col rounded-[2rem] border border-accent/40 bg-black/40 p-10 shadow-[0_0_80px_-20px_rgba(109,40,217,0.3)] md:-mt-4 md:-mb-4 z-10 overflow-hidden flex-1">
                        {/* Glow */}
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

                        {/* Background subtle glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 blur-[50px] pointer-events-none rounded-full" />

                        <div className="mb-8 relative z-10">
                            <h3 className="font-orbitron font-bold text-xl text-foreground mb-2 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                                ULTRA
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Unlimited tracking and AI-powered
                                recommendations.
                            </p>
                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-4xl font-bold font-orbitron text-foreground">
                                    $10.99
                                </span>
                                <span className="text-muted-foreground text-sm font-medium mb-1">
                                    / mo
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-10 flex-1 relative z-10">
                            {ultraFeatures.map((item, i) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-sm text-white/90"
                                >
                                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-[4px] bg-accent/20 border border-accent/30 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                        <Check className="w-3.5 h-3.5 text-accent" />
                                    </span>
                                    <span
                                        className={
                                            i === 1 || i === 2
                                                ? "font-medium text-accent-content"
                                                : ""
                                        }
                                    >
                                        {item}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            asChild
                            variant="premiumAccent"
                            size="lg"
                            className="w-full mt-auto bg-accent/20 border border-accent/40 text-foreground shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.2),0_0_0_0.5px_rgba(255,255,255,0.2)] hover:bg-accent/30 z-10"
                        >
                            <Link href="/register">Unlock Ultra</Link>
                        </Button>
                    </div>

                    {/* Pro Tier (Right) */}
                    <div className="relative flex flex-col rounded-[2rem] border border-border/40 bg-card/40 p-10 flex-1">
                        <div className="mb-8">
                            <h3 className="font-orbitron font-bold text-xl text-foreground mb-2 text-white/90">
                                PRO
                            </h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                The Enthusiast Tier. For dedicated gamers
                                tracking large collections.
                            </p>
                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-4xl font-bold font-orbitron text-foreground">
                                    $5.99
                                </span>
                                <span className="text-muted-foreground text-sm font-medium mb-1">
                                    / mo
                                </span>
                            </div>
                        </div>

                        <ul className="space-y-4 mb-10 flex-1">
                            {proFeatures.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-start gap-3 text-sm text-white/90"
                                >
                                    <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-[4px] bg-primary/10 border border-primary/20 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                        <Check className="w-3.5 h-3.5 text-primary" />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <Button
                            asChild
                            variant="premium"
                            size="lg"
                            className="w-full mt-auto bg-primary/10 border border-primary/30 text-white hover:bg-primary/20"
                        >
                            <Link href="/register">Start Pro</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
