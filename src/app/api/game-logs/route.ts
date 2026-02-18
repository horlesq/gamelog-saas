import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { createGameLogSchema } from "@/lib/validations";
import { GameLogService } from "@/lib/services/game-log-service";

export async function GET(request: NextRequest) {
    try {
        const user = await requireAuth();

        const { searchParams } = new URL(request.url);
        const search = searchParams.get("search") || undefined;
        const status = searchParams.get("status") || undefined;

        const gameLogs = await GameLogService.getUserGameLogs(user.userId, {
            search,
            status,
        });

        const stats = await GameLogService.getUserStats(user.userId);

        return NextResponse.json({ gameLogs, stats });
    } catch (error) {
        console.error("Get game logs error:", error);

        if (
            error instanceof Error &&
            error.message === "Authentication required"
        ) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 },
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const user = await requireAuth();
        const body = await request.json();

        const validatedData = createGameLogSchema.parse(body);

        const gameLog = await GameLogService.createGameLog(
            user.userId,
            validatedData,
        );

        return NextResponse.json({ gameLog }, { status: 201 });
    } catch (error) {
        console.error("Create game log error:", error);

        if (
            error instanceof Error &&
            error.message === "Authentication required"
        ) {
            return NextResponse.json(
                { error: "Authentication required" },
                { status: 401 },
            );
        }

        if (error instanceof Error && error.name === "ZodError") {
            return NextResponse.json(
                { error: "Invalid input data" },
                { status: 400 },
            );
        }

        // Handle unique constraint violation (game already logged)
        if (
            error instanceof Error &&
            error.message.includes("Unique constraint")
        ) {
            return NextResponse.json(
                { error: "You have already logged this game" },
                { status: 409 },
            );
        }

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}
