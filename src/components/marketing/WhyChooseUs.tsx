import { Layers, Filter, Zap, Plus } from "lucide-react";

export default function WhyChooseUs() {
    const pillars = [
        {
            title: "Total Organization",
            description:
                "Keep your entire gaming history neatly organized by status in one centralized dashboard.",
            icon: Layers,
        },
        {
            title: "Advanced Filtering",
            description:
                "Slice your library by platform, rating, completion status, or custom tags.",
            icon: Filter,
        },
        {
            title: "Ease of Use",
            description:
                "Built for speed. Search and add a new game to your library in just a few clicks.",
            icon: Zap,
        },
    ];

    return (
        <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
            {/* ── Background Glow ── */}
            <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
                <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px]" />
            </div>

            <div className="mx-auto max-w-7xl relative z-10">
                {/* ── Header ── */}
                <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center space-y-4 text-center mb-16">
                    <h2 className="font-orbitron font-bold text-3xl sm:text-5xl md:text-6xl/none bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
                        Why GameLog?
                    </h2>
                    <p className="max-w-[42rem] leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                        Designed from the ground up to bring order to your
                        backlog and insights to your gaming habits.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {pillars.map((pillar, index) => (
                        <div
                            key={index}
                            className="group relative flex flex-col items-center text-center p-4"
                        >
                            {/* Astra-style Glass Icon Container */}
                            <div className="relative mb-8 flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 backdrop-blur-[10px] shadow-[inset_0_0_0_0.5px_rgba(255,255,255,0.2)]">
                                <pillar.icon className="w-7 h-7 text-accent" />
                            </div>

                            <h3 className="font-orbitron font-bold text-xl text-foreground mb-4">
                                {pillar.title}
                            </h3>

                            <p className="text-muted-foreground leading-relaxed text-sm lg:text-base mb-2 max-w-xs">
                                {pillar.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
