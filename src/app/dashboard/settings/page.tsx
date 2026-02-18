"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User as UserIcon, Users, Shield } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { User } from "@/types/user";
import { useUpdate } from "@/contexts/UpdateContext";
import { getCurrentUser } from "@/lib/auth/client";
import ProfileSettings from "@/components/features/settings/ProfileSettings";
import UserManagement from "@/components/features/settings/UserManagement";
import VersionSettings from "@/components/features/settings/VersionSettings";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("profile");
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { showVersionTabDot, dismissVersionTabDot } = useUpdate();

    useEffect(() => {
        fetchCurrentUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const data = await getCurrentUser();
            setCurrentUser(data.user);
        } catch (error) {
            console.error("Error fetching current user:", error);
            if (error instanceof Error && error.message.includes("401")) {
                router.push("/login");
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div>Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="mb-6 sm:mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                        Settings
                    </h1>
                    <p className="text-muted-foreground mt-2">
                        Manage your profile and system settings
                    </p>
                </div>

                <div className="space-y-6">
                    {/* Tab Navigation */}
                    <div className="flex flex-col sm:flex-row sm:space-x-1 bg-muted p-1 rounded-lg max-w-full sm:max-w-fit overflow-x-auto">
                        <button
                            onClick={() => setActiveTab("profile")}
                            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                                activeTab === "profile"
                                    ? "bg-card shadow-sm text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            <UserIcon className="h-4 w-4" />
                            <span>Profile</span>
                        </button>
                        {currentUser?.isAdmin && (
                            <>
                                <button
                                    onClick={() => setActiveTab("users")}
                                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors whitespace-nowrap ${
                                        activeTab === "users"
                                            ? "bg-card shadow-sm text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <Users className="h-4 w-4" />
                                    <span>Users</span>
                                </button>
                                <button
                                    onClick={() => {
                                        if (showVersionTabDot) {
                                            dismissVersionTabDot();
                                        }
                                        setActiveTab("version");
                                    }}
                                    className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-md transition-colors relative whitespace-nowrap ${
                                        activeTab === "version"
                                            ? "bg-card shadow-sm text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    <Shield className="h-4 w-4" />
                                    <span>Version</span>
                                    {showVersionTabDot && (
                                        <span className="absolute -top-1 -right-1 h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
                                    )}
                                </button>
                            </>
                        )}
                    </div>

                    {/* Content Area */}
                    {activeTab === "profile" && (
                        <ProfileSettings
                            currentUser={currentUser}
                            onUserUpdate={(updatedUser) =>
                                setCurrentUser(updatedUser)
                            }
                        />
                    )}

                    {currentUser?.isAdmin && activeTab === "users" && (
                        <UserManagement currentUser={currentUser} />
                    )}

                    {currentUser?.isAdmin && activeTab === "version" && (
                        <VersionSettings />
                    )}
                </div>
            </main>
        </div>
    );
}
