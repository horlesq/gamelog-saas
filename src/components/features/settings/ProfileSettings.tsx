"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { User, UpdateProfileFormData } from "@/types/user";
import { updateProfile } from "@/lib/auth/client";

interface ProfileSettingsProps {
    currentUser: User | null;
    onUserUpdate: (updatedUser: User) => void;
}

export default function ProfileSettings({
    currentUser,
    onUserUpdate,
}: ProfileSettingsProps) {
    const [profileData, setProfileData] = useState<UpdateProfileFormData>({
        currentPassword: "",
        newPassword: "",
    });
    const [profileLoading, setProfileLoading] = useState(false);
    const [profileError, setProfileError] = useState("");
    const [profileSuccess, setProfileSuccess] = useState("");

    // Initialize/Update form data when currentUser changes
    // Email is no longer updated in state as it's read-only
    useEffect(() => {
        // Keeping this hook in case we need to initialize other fields based on currentUser later
    }, [currentUser]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileLoading(true);
        setProfileError("");
        setProfileSuccess("");

        try {
            await updateProfile(profileData);

            setProfileSuccess("Profile updated successfully");
            setProfileData((prev) => ({
                ...prev,
                currentPassword: "",
                newPassword: "",
            }));
        } catch (err) {
            setProfileError(
                err instanceof Error ? err.message : "Failed to update profile",
            );
        } finally {
            setProfileLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold text-foreground">
                    Profile Settings
                </h2>
                <p className="text-muted-foreground mt-1">
                    Update your password
                </p>
            </div>

            <Card>
                <CardContent>
                    <form
                        onSubmit={handleProfileUpdate}
                        className="space-y-4 max-w-full sm:max-w-md"
                    >
                        {(currentUser?.hasPassword ?? true) && (
                            <div className="space-y-2">
                                <Label htmlFor="current-password">
                                    Current Password
                                </Label>
                                <Input
                                    id="current-password"
                                    type="password"
                                    value={profileData.currentPassword || ""}
                                    onChange={(e) =>
                                        setProfileData((prev) => ({
                                            ...prev,
                                            currentPassword: e.target.value,
                                        }))
                                    }
                                    required={currentUser?.hasPassword ?? true}
                                    className="bg-muted"
                                />
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={currentUser?.email || ""}
                                disabled
                                className="bg-muted opacity-70"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                Email addresses cannot be changed after
                                registration.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="new-password">
                                New Password (optional)
                            </Label>
                            <Input
                                id="new-password"
                                type="password"
                                value={profileData.newPassword}
                                onChange={(e) =>
                                    setProfileData((prev) => ({
                                        ...prev,
                                        newPassword: e.target.value,
                                    }))
                                }
                                minLength={6}
                                className="bg-muted"
                            />
                        </div>

                        {profileError && (
                            <div className="text-sm text-red-600 bg-red-50 p-3 rounded">
                                {profileError}
                            </div>
                        )}

                        {profileSuccess && (
                            <div className="text-sm text-green-600 bg-green-50 p-3 rounded">
                                {profileSuccess}
                            </div>
                        )}

                        <Button type="submit" disabled={profileLoading}>
                            {profileLoading ? "Updating..." : "Update Profile"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
