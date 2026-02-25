import Image from "next/image";
import { Check } from "lucide-react";

export default function Features() {
    return (
        <section
            id="features"
            className="relative w-full bg-background/50 px-6 py-24 md:py-32 overflow-hidden"
        >
            {/* ── Header ── */}
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center mb-16 md:mb-24">
                <h2 className="font-orbitron font-bold text-3xl sm:text-5xl md:text-6xl/none bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                    Master your game library.
                </h2>
                <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                    Say goodbye to messy spreadsheets. Track your progress,
                    organize your backlog, and discover your next favorite game
                    in one beautiful dashboard.
                </p>
            </div>

            {/* ── Features Grid (Blueprint Style) ── */}
            <div className="mx-auto max-w-7xl relative">
                <div className="grid grid-cols-1 lg:grid-cols-2 border border-border/40 relative rounded-3xl overflow-hidden shadow-2xl">
                    {/* Vertical Center Line for Desktop */}
                    <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border/40 -translate-x-1/2" />

                    {/* ── Row 1 ── */}
                    {/* Text Cell (Left) */}
                    <div className="relative border-y border-border/40 lg:border-r-0 lg:border-y-0 lg:border-b border-border/40 p-10 md:p-16 lg:p-20 bg-card/40">
                        <div className="absolute -left-1 flex items-center h-full w-2"></div>
                        <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-foreground mb-4">
                            Manage Your Backlog
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                            Put your backlog on autopilot so you always know
                            what to play next.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm md:text-base text-white/90">
                                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                    <Check className="w-3.5 h-3.5 text-white/70" />
                                </span>
                                Track games across all platforms.
                            </li>
                            <li className="flex items-start gap-3 text-sm md:text-base text-white/90">
                                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                    <Check className="w-3.5 h-3.5 text-white/70" />
                                </span>
                                Organize by status and custom tags.
                            </li>
                            <li className="flex items-start gap-3 text-sm md:text-base text-white/90">
                                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                    <Check className="w-3.5 h-3.5 text-white/70" />
                                </span>
                                Never lose track of your collection.
                            </li>
                        </ul>
                    </div>

                    {/* Image Cell (Right) */}
                    <div className="relative border-b border-border/40 min-h-[300px] lg:min-h-full flex items-center justify-center p-8 bg-black/20 overflow-hidden">
                        {/* Dot Pattern Background */}
                        <div
                            className="absolute inset-0 opacity-[0.15]"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at center, white 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/20 blur-[100px] rounded-full sm:w-[500px] sm:h-[500px]" />

                        <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                            <Image
                                src="/3d/bag.png"
                                alt="Backlog Tracking"
                                fill
                                className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                sizes="(max-width: 768px) 192px, 256px"
                            />
                        </div>
                    </div>

                    {/* ── Row 2 ── */}
                    {/* Image Cell (Left Desktop, changes order on mobile to always be text first. Actually, following the blueprint, let's keep the alternating layout visually as in the example. On mobile it's often better to have Text -> Image. Let's do Text -> Image on Mobile, alternating on Desktop) */}

                    {/* The Image (Row 2 Left on Desktop, Right/Bottom on Mobile) */}
                    <div className="order-4 lg:order-3 relative border-b border-border/40 min-h-[300px] lg:min-h-full flex items-center justify-center p-8 bg-black/20 overflow-hidden">
                        {/* Dot Pattern Background */}
                        <div
                            className="absolute inset-0 opacity-[0.15]"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at center, white 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-secondary/30 blur-[100px] rounded-full sm:w-[500px] sm:h-[500px]" />

                        <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                            <Image
                                src="/3d/notebook.png"
                                alt="Log Playthroughs"
                                fill
                                className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                sizes="(max-width: 768px) 192px, 256px"
                            />
                        </div>
                    </div>

                    {/* Text Cell (Right Desktop, Top on Mobile) */}
                    <div className="order-3 lg:order-4 relative border-y border-border/40 lg:border-y-0 lg:border-b border-border/40 p-10 md:p-16 lg:p-20 bg-card/40">
                        <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-foreground mb-4">
                            Log & Review
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                            Record every detail of your gaming journey and share
                            your thoughts.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm md:text-base text-white/90">
                                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                    <Check className="w-3.5 h-3.5 text-white/70" />
                                </span>
                                Rate games and write detailed notes.
                            </li>
                            <li className="flex items-start gap-3 text-sm md:text-base text-white/90">
                                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                    <Check className="w-3.5 h-3.5 text-white/70" />
                                </span>
                                Track play time and completion status.
                            </li>
                            <li className="flex items-start gap-3 text-sm md:text-base text-white/90">
                                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                    <Check className="w-3.5 h-3.5 text-white/70" />
                                </span>
                                Keep a history of your gaming life.
                            </li>
                        </ul>
                    </div>

                    {/* ── Row 3 ── */}
                    {/* Text Cell (Left) */}
                    <div className="order-5 relative border-y lg:border-y-0 border-border/40 p-10 md:p-16 lg:p-20 bg-card/40">
                        <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-foreground mb-4 opacity-90">
                            AI Recommendations{" "}
                            <span className="text-xs font-mono uppercase text-accent ml-2 tracking-widest leading-none bg-accent/10 px-2 py-1 rounded-full border border-accent/20 align-middle">
                                Coming Soon
                            </span>
                        </h3>
                        <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-8">
                            Get smart game recommendations based on what you
                            already love to play.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm md:text-base text-white/90">
                                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                    <Check className="w-3.5 h-3.5 text-white/70" />
                                </span>
                                Discover hidden gems tailored to your taste.
                            </li>
                            <li className="flex items-start gap-3 text-sm md:text-base text-white/90">
                                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                    <Check className="w-3.5 h-3.5 text-white/70" />
                                </span>
                                Analyze your backlog for your next favorite
                                game.
                            </li>
                            <li className="flex items-start gap-3 text-sm md:text-base text-white/90">
                                <span className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-white/5 border border-white/10 mt-0.5 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                                    <Check className="w-3.5 h-3.5 text-white/70" />
                                </span>
                                AI-powered insights into your gaming
                                preferences.
                            </li>
                        </ul>
                    </div>

                    {/* Image Cell (Right) */}
                    <div className="order-6 relative min-h-[300px] lg:min-h-full flex items-center justify-center p-8 bg-black/20 overflow-hidden">
                        {/* Dot Pattern Background */}
                        <div
                            className="absolute inset-0 opacity-[0.15]"
                            style={{
                                backgroundImage:
                                    "radial-gradient(circle at center, white 1px, transparent 1px)",
                                backgroundSize: "24px 24px",
                            }}
                        />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent/15 blur-[100px] rounded-full sm:w-[500px] sm:h-[500px]" />

                        <div className="relative w-48 h-48 sm:w-64 sm:h-64">
                            <Image
                                src="/3d/magic.png"
                                alt="AI Recommendations"
                                fill
                                className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                                sizes="(max-width: 768px) 192px, 256px"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Additional subtle background elements ── */}
            <div className="absolute -left-1/4 top-1/4 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute -right-1/4 bottom-1/4 w-[600px] h-[600px] bg-accent/50 blur-[100px] rounded-full pointer-events-none -z-10" />
        </section>
    );
}
