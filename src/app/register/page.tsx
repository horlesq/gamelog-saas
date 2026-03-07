"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { registerUser } from "@/lib/auth/client";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            await registerUser({ email, password });

            // Show success UI instead of the form
            setError("");
            setIsSuccess(true);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Registration failed",
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
            <Card className="w-full max-w-sm sm:max-w-md">
                <CardHeader className="space-y-1 px-4 sm:px-6 text-center">
                    <CardTitle className="text-2xl sm:text-3xl  flex items-center justify-center gap-3">
                        <Image
                            src="/3d/next.png"
                            alt="GameLog"
                            width={48}
                            height={48}
                            priority
                            className="w-12 h-12 object-contain"
                        />
                        <span className="font-extrabold tracking-tight text-foreground">
                            GameLog
                        </span>
                    </CardTitle>
                    <CardDescription className="text-center text-sm sm:text-base">
                        {isSuccess
                            ? "Check your email"
                            : "Create an account to start tracking"}
                    </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
                            <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">
                                Verification link sent!
                            </h3>
                            <p className="text-muted-foreground text-sm max-w-[250px]">
                                We&apos;ve sent an email to{" "}
                                <strong>{email}</strong>. Please click the link
                                to verify your account.
                            </p>
                            <Button
                                variant="outline"
                                className="mt-6 w-full"
                                onClick={() => router.push("/login")}
                            >
                                Back to login
                            </Button>
                        </div>
                    ) : (
                        <>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm">
                                        Email
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        required
                                        className="h-10 sm:h-10 bg-muted"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="password"
                                        className="text-sm"
                                    >
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Aa1@... (min 8 chars)"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        required
                                        minLength={8}
                                        className="h-10 sm:h-10 bg-muted"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label
                                        htmlFor="confirmPassword"
                                        className="text-sm"
                                    >
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="confirmPassword"
                                        type="password"
                                        placeholder="Re-enter your password"
                                        value={confirmPassword}
                                        onChange={(e) =>
                                            setConfirmPassword(e.target.value)
                                        }
                                        required
                                        minLength={6}
                                        className="h-10 sm:h-10 bg-muted"
                                    />
                                </div>
                                {error && (
                                    <div className="text-sm text-red-600 bg-red-50 p-3 rounded break-words">
                                        {error}
                                    </div>
                                )}
                                <Button
                                    type="submit"
                                    className="w-full h-10 sm:h-10"
                                    disabled={loading}
                                >
                                    {loading
                                        ? "Creating account..."
                                        : "Create account"}
                                </Button>
                            </form>

                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t" />
                                </div>
                                <div className="relative flex justify-center text-xs uppercase">
                                    <span className="bg-background px-2 text-muted-foreground">
                                        Or register with
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Button
                                    variant="outline"
                                    className="bg-background/50"
                                    onClick={() =>
                                        (window.location.href =
                                            "/api/auth/google")
                                    }
                                    type="button"
                                >
                                    <svg
                                        className="mr-1 h-6 w-6"
                                        viewBox="76 72 488 496"
                                        fill="currentColor"
                                    >
                                        <path d="M564 325.8C564 467.3 467.1 568 324 568C186.8 568 76 457.2 76 320C76 182.8 186.8 72 324 72C390.8 72 447 96.5 490.3 136.9L422.8 201.8C334.5 116.6 170.3 180.6 170.3 320C170.3 406.5 239.4 476.6 324 476.6C422.2 476.6 459 406.2 464.8 369.7L324 369.7L324 284.4L560.1 284.4C562.4 297.1 564 309.3 564 325.8z" />
                                    </svg>
                                    Google
                                </Button>
                                {/* <Button
                                    variant="outline"
                                    className="bg-background/50"
                                    onClick={() =>
                                        (window.location.href =
                                            "/api/auth/steam")
                                    }
                                    type="button"
                                >
                                    <svg
                                        className="mr-1 h-6 w-6"
                                        viewBox="72 72 496 496"
                                        fill="currentColor"
                                    >
                                        <path d="M568 320C568 457 456.8 568 319.6 568C205.8 568 110 491.7 80.6 387.6L175.8 426.9C182.2 459 210.7 483.3 244.7 483.3C283.9 483.3 316.6 450.9 314.9 409.8L399.4 349.6C451.5 350.9 495.2 308.7 495.2 256.1C495.2 204.5 453.2 162.6 401.5 162.6C349.8 162.6 307.8 204.6 307.8 256.1L307.8 257.3L248.6 343C233.1 342.1 217.9 346.4 205.1 355.1L72 300.1C82.2 172.4 189.1 72 319.6 72C456.8 72 568 183 568 320zM227.7 448.3L197.2 435.7C202.8 447.3 212.5 456.5 224.4 461.5C251.3 472.7 282.2 459.9 293.4 433.1C298.8 420.1 298.9 405.8 293.5 392.8C288.1 379.8 278 369.6 265 364.2C252.1 358.8 238.3 359 226.1 363.6L257.6 376.6C277.4 384.8 286.8 407.5 278.5 427.3C270.2 447.2 247.5 456.5 227.7 448.3zM401.5 193.8C435.9 193.8 463.8 221.7 463.8 256.1C463.8 290.5 435.9 318.4 401.5 318.4C367.1 318.4 339.2 290.5 339.2 256.1C339.2 221.7 367.1 193.8 401.5 193.8zM401.6 302.8C427.4 302.8 448.4 281.8 448.4 256C448.4 230.2 427.4 209.2 401.6 209.2C375.8 209.2 354.8 230.2 354.8 256C354.8 281.8 375.8 302.8 401.6 302.8z" />
                                    </svg>
                                    Steam
                                </Button> */}
                            </div>
                            <div className="mt-4 text-sm text-muted-foreground text-center">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="text-primary hover:underline ml-1"
                                >
                                    Sign in
                                </Link>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
