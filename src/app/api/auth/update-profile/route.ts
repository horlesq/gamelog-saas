import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { AuthService } from "@/lib/services/auth-service";
import { updateProfileSchema } from "@/lib/validations";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function PUT(request: NextRequest) {
    try {
        // Require authentication
        const authUser = await requireAuth();

        const body = await request.json();

        // Validate input
        const validatedData = updateProfileSchema.parse(body);

        // Update user profile using service
        const updatedUser = await AuthService.updateUserProfile(
            authUser.userId,
            {
                newPassword: validatedData.newPassword,
            },
            validatedData.currentPassword,
        );

        return NextResponse.json({
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("Update profile error:", error);

        if (error instanceof Error) {
            if (error.name === "ZodError") {
                return NextResponse.json(
                    { error: "Invalid input data" },
                    { status: 400 },
                );
            }

            if (error.message === "Authentication required") {
                return NextResponse.json(
                    { error: "Authentication required" },
                    { status: 401 },
                );
            }
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
