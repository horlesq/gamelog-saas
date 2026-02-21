"use client";

import { useState, forwardRef, useImperativeHandle } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Plus, LogOut, Settings, Menu, X, LayoutDashboard } from "lucide-react";
import { useUpdate } from "@/contexts/UpdateContext";
import { logoutUser } from "@/lib/auth/client";

interface NavbarProps {
    onAddGame?: () => void;
}

export interface NavbarRef {
    openAddModal: () => void;
}

const Navbar = forwardRef<NavbarRef, NavbarProps>(({ onAddGame }, ref) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const { showNavbarDot, dismissNavbarDot } = useUpdate();

    useImperativeHandle(ref, () => ({
        openAddModal: () => onAddGame?.(),
    }));

    const handleLogout = async () => {
        try {
            await logoutUser();
            router.push("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const handleSettingsClick = () => {
        if (showNavbarDot) {
            dismissNavbarDot();
        }
        router.push("/dashboard/settings");
    };

    return (
        <header className="bg-card/95 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div
                        className="flex items-center space-x-2 cursor-pointer"
                        onClick={() => router.push("/dashboard")}
                    >
                        <Image
                            src="/3d/next.png"
                            alt="GameLog"
                            width={40}
                            height={40}
                            priority
                            className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-200"
                        />
                        <h1 className="text-xl sm:text-2xl font-bold text-foreground">
                            Game<span className="text-accent">Log</span>
                        </h1>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-2 lg:space-x-4">
                        {pathname === "/dashboard" ? (
                            <Button
                                onClick={() => onAddGame?.()}
                                className="flex items-center space-x-2 bg-secondary hover:bg-primary/80 text-white cursor-pointer"
                            >
                                <Plus className="h-4 w-4" />
                                <span className="hidden lg:inline">
                                    Add Game
                                </span>
                            </Button>
                        ) : (
                            <Button
                                onClick={() => router.push("/dashboard")}
                                className="flex items-center space-x-2 bg-secondary hover:bg-primary/80 text-white cursor-pointer"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                <span className="hidden lg:inline">
                                    Dashboard
                                </span>
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            onClick={handleSettingsClick}
                            className="flex items-center space-x-2 relative cursor-pointer"
                        >
                            <Settings className="h-4 w-4" />
                            <span className="hidden lg:inline">Settings</span>
                            {showNavbarDot && (
                                <span className="absolute -top-1 -right-1 h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                            )}
                        </Button>
                        <Button
                            variant="outline"
                            onClick={handleLogout}
                            className="flex items-center space-x-2 cursor-pointer"
                        >
                            <LogOut className="h-4 w-4" />
                            <span className="hidden lg:inline">Logout</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <Button
                            variant="mobile"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                        {pathname === "/dashboard" ? (
                            <Button
                                onClick={() => {
                                    onAddGame?.();
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center justify-start space-x-2 bg-secondary hover:bg-primary/80 text-white"
                            >
                                <Plus className="h-4 w-4" />
                                <span>Add Game</span>
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    router.push("/dashboard");
                                    setMobileMenuOpen(false);
                                }}
                                className="w-full flex items-center justify-start space-x-2 bg-secondary hover:bg-primary/80 text-white"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                <span>Dashboard</span>
                            </Button>
                        )}

                        <Button
                            variant="outline"
                            onClick={() => {
                                handleSettingsClick();
                                setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-start space-x-2 relative"
                        >
                            <Settings className="h-4 w-4" />
                            <span>Settings</span>
                            {showNavbarDot && (
                                <span className="absolute left-8 top-2 h-2 w-2 bg-purple-500 rounded-full animate-pulse" />
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={() => {
                                handleLogout();
                                setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center justify-start space-x-2"
                        >
                            <LogOut className="h-4 w-4" />
                            <span>Logout</span>
                        </Button>
                    </div>
                )}
            </div>
        </header>
    );
});

Navbar.displayName = "Navbar";

export default Navbar;
