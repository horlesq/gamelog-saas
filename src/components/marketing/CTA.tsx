import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FloatingIcon } from "./FloatingIcon";

export default function CTA() {
    return (
        <section className="relative w-full py-24 md:py-32 overflow-hidden bg-background">
            <div className="mx-auto max-w-[90rem] relative z-10 flex flex-row items-center justify-center">
                {/* Left Asset */}
                <div className="hidden md:block shrink-0">
                    <FloatingIcon yOffset={20} duration={6}>
                        <div className="relative w-68 h-68 xl:w-80 xl:h-80">
                            <Image
                                src="/3d/rocket.png"
                                alt="Speed and performance"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </FloatingIcon>
                </div>
                <div className="md:hidden shrink-0">
                    <FloatingIcon yOffset={20} duration={6}>
                        <div className="relative w-32 h-32">
                            <Image
                                src="/3d/medal-2.png"
                                alt="Speed and performance"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </FloatingIcon>
                </div>

                {/* Text Content */}
                <div className="flex flex-col items-center justify-center text-center shrink z-10">
                    {/* Header */}
                    <div className="mb-12">
                        <h2 className="font-orbitron font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent mb-6 tracking-tight">
                            Level up your game library.
                        </h2>
                        <p className="max-w-lg mx-auto leading-relaxed text-muted-foreground sm:text-xl sm:leading-8">
                            Take control of your backlog and discover what to
                            play next.
                        </p>
                    </div>

                    <Button asChild variant="premiumAccent" size="xl">
                        <Link href="/register">
                            <span>START LOGGING GAMES</span>
                        </Link>
                    </Button>
                </div>

                {/* Right Asset */}
                <div className="hidden md:block shrink-0">
                    <FloatingIcon yOffset={-20} duration={6}>
                        <div className="relative w-68 h-68 xl:w-80 xl:h-80">
                            <Image
                                src="/3d/medal.png"
                                alt="Achievements and progress"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </FloatingIcon>
                </div>
                <div className="md:hidden shrink-0">
                    <FloatingIcon yOffset={-20} duration={6}>
                        <div className="relative w-32 h-32">
                            <Image
                                src="/3d/rocket-2.png"
                                alt="Achievements and progress"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </FloatingIcon>
                </div>
            </div>
        </section>
    );
}
