import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/services/auth-service";
import { registerSchema } from "@/lib/validations";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input
        const validatedData = registerSchema.parse(body);

        // Create user (force isAdmin to false for public registration)
        const user = await AuthService.createUser({
            ...validatedData,
            isAdmin: false,
        });

        // Create JWT token for auto-login after registration
        const token = jwt.sign(
            { userId: user.id, email: user.email, isAdmin: user.isAdmin },
            JWT_SECRET,
            { expiresIn: "7d" },
        );

        // Set cookie
        const cookieStore = await cookies();
        cookieStore.set("auth-token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
            },
            message: "Registration successful",
        });
    } catch (error) {
        console.error("Registration error:", error);

        if (error instanceof Error) {
            if (error.name === "ZodError") {
                return NextResponse.json(
                    { error: "Invalid input data" },
                    { status: 400 },
                );
            }
            if (error.message === "Email is already in use") {
                return NextResponse.json(
                    { error: "Email is already in use" },
                    { status: 409 },
                );
            }
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
