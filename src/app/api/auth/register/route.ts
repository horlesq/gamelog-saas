import { NextRequest, NextResponse } from "next/server";
import { AuthService } from "@/lib/services/auth-service";
import { registerSchema } from "@/lib/validations";
import { cookies } from "next/headers";
import { sendVerificationEmail } from "@/lib/emails/mail";

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

        // Generate verification token
        const verificationToken = await AuthService.generateVerificationToken(
            user.email,
        );

        // Send email
        await sendVerificationEmail(user.email, verificationToken.token);

        return NextResponse.json({
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                isAdmin: user.isAdmin,
            },
            message:
                "Registration successful. Please check your email to verify your account.",
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
