import Link from "next/link";
import Image from "next/image";

export default function LandingFooter() {
    return (
        <footer className="w-full border-t-2 border-border/50 bg-background pt-12 pb-16 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-4 md:gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="md:col-span-2 flex flex-col items-start">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 group mb-6"
                        >
                            <Image
                                src="/3d/next.png"
                                alt="GameLog Logo"
                                width={40}
                                height={40}
                                priority
                                className="w-8 h-8 object-contain group-hover:rotate-4 group-hover:scale-110 transition-all duration-300"
                            />
                            <span className="font-bold text-xl tracking-tight text-foreground">
                                Game<span className="text-accent">Log</span>
                            </span>
                        </Link>
                        <p className="text-muted-foreground text-sm sm:text-base max-w-sm mb-6 leading-relaxed">
                            Keep track of your video games with GameLog.
                        </p>
                        <p className="text-muted-foreground/50 text-xs sm:text-sm">
                            © {new Date().getFullYear()} GameLog. All rights
                            reserved.
                        </p>
                    </div>

                    {/* Product Links */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-foreground font-semibold mb-6 tracking-wide text-sm uppercase">
                            Product
                        </h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="#features"
                                    className="hover:text-foreground hover:underline transition-colors underline-offset-4"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#pricing"
                                    className="hover:text-foreground hover:underline transition-colors underline-offset-4"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/changelog"
                                    className="hover:text-foreground hover:underline transition-colors underline-offset-4"
                                >
                                    Changelog
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="flex flex-col items-start">
                        <h3 className="text-foreground font-semibold mb-6 tracking-wide text-sm uppercase">
                            Legal & More
                        </h3>
                        <ul className="space-y-4 text-sm text-muted-foreground">
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-foreground hover:underline transition-colors underline-offset-4"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-foreground hover:underline transition-colors underline-offset-4"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="https://github.com/horlesq/gamelog"
                                    target="_blank"
                                    className="hover:text-foreground hover:underline transition-colors flex items-center gap-2 underline-offset-4"
                                >
                                    GitHub Source
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
