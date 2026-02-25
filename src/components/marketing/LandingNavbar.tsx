"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronRight, Github, LogIn, ArrowRight, BadgeQuestionMark, Info, Tag, Component } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LandingNavbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header className="relative z-50 pt-4 sm:pt-6 w-full transition-all duration-500 ease-in-out">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div
                    className={`relative rounded-xl transition-all duration-500 ease-in-out overflow-hidden border border-border/40 ${
                        scrolled
                            ? "bg-card/80 shadow-lg shadow-black/20 backdrop-blur-xl"
                            : "bg-card shadow-sm backdrop-blur-md"
                    }`}
                >
                    <div className="flex h-16 items-center justify-between px-4 sm:px-6">
                        <Link
                            href="/"
                            className="flex items-center space-x-2 group"
                        >
                            <Image
                                src="/3d/next.png"
                                alt="GameLog"
                                width={40}
                                height={40}
                                priority
                                className="w-9 h-9 sm:w-10 sm:h-10 object-contain group-hover:rotate-4 group-hover:scale-110 transition-all duration-300"
                            />
                            <h1 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                                Game<span className="text-accent">Log</span>
                            </h1>
                        </Link>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                            <Link
                                href="#features"
                                className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-white/5 px-3 py-2 rounded-lg"
                            >
                                Features
                            </Link>
                            <Link
                                href="#pricing"
                                className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-white/5 px-3 py-2 rounded-lg"
                            >
                                Pricing
                            </Link>
                            <Link
                                href="#faq"
                                className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-white/5 px-3 py-2 rounded-lg"
                            >
                                Questions
                            </Link>
                            <Link
                                href="https://github.com/horlesq/gamelog"
                                target="_blank"
                                className="text-muted-foreground transition-all hover:text-accent hover:bg-accent/10 px-3 py-2 rounded-lg flex items-center justify-center"
                                aria-label="GitHub Repository"
                            >
                                <Github className="size-4" />
                            </Link>

                            <div className="ml-2 pl-2 border-l border-white/10 flex items-center space-x-2">
                                <Button
                                    variant="ghost"
                                    asChild
                                    className="space-x-2"
                                    size="sm"
                                >
                                    <Link href="/login">
                                        <LogIn className="size-4" />
                                        <span>Sign In</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="default"
                                    className="space-x-2"
                                    size="sm"
                                >
                                    <Link href="/register">
                                        <span>Get Started</span>
                                        <ArrowRight className="size-4" />
                                    </Link>
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden flex items-center">
                            <Button
                                variant="ghost"
                                onClick={() =>
                                    setMobileMenuOpen(!mobileMenuOpen)
                                }
                                aria-label="Toggle mobile menu"
                                className="h-10 w-10 p-0 hover:bg-white/10"
                            >
                                {mobileMenuOpen ? (
                                    <X className="size-5" />
                                ) : (
                                    <Menu className="size-5" />
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    <div
                        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                            mobileMenuOpen
                                ? "max-h-80 opacity-100 border-t border-white/10 bg-card/50 backdrop-blur-xl"
                                : "max-h-0 opacity-0"
                        }`}
                    >
                        <div className="px-4 py-4 space-y-2">
                            <Button
                                asChild
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Link
                                    href="#features"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Component className="size-4" />
                                        <span>Features</span>
                                    </div>
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Link
                                    href="#pricing"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Tag className="size-4" />
                                        <span>Pricing</span>
                                    </div>
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Link
                                    href="#faq"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    
                                    <div className="flex items-center space-x-2">
                                        <Info className="size-4" />
                                        <span>Questions</span>
                                    </div>
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                className="w-full justify-start"
                            >
                                <Link
                                    href="https://github.com/horlesq/gamelog"
                                    target="_blank"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <div className="flex items-center space-x-2">
                                        <Github className="size-4" />
                                        <span>GitHub</span>
                                    </div>
                                </Link>
                            </Button>

                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <Button
                                    variant="default"
                                    asChild
                                    className="w-full bg-accent/30 border-accent/30 hover:bg-accent/50 hover:border-accent/50"
                                >
                                    <Link href="/login">
                                        <LogIn className="size-4" />
                                        <span>Sign In</span>
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    variant="default"
                                    className="w-full"
                                >
                                    <Link href="/register">
                                        <span className="relative z-10 flex items-center justify-center space-x-2">
                                            <span>Get Started</span>
                                            <ArrowRight className="size-4" />
                                        </span>
                                        <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
