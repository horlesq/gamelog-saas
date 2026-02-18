import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { updateGameLogSchema } from "@/lib/validations";
import { GameLogService } from "@/lib/services/game-log-service";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        const user = await requireAuth();

        const gameLog = await GameLogService.getGameLogById(id, user.userId);

        if (!gameLog) {
            return NextResponse.json(
                { error: "Game log not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({ gameLog });
    } catch (error) {
        console.error("Get game log error:", error);

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

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        const user = await requireAuth();
        const body = await request.json();

        const validatedData = updateGameLogSchema.parse(body);

        const gameLog = await GameLogService.updateGameLog(
            id,
            user.userId,
            validatedData,
        );

        return NextResponse.json({ gameLog });
    } catch (error) {
        console.error("Update game log error:", error);

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

        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 },
        );
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params;
    try {
        const user = await requireAuth();

        await GameLogService.deleteGameLog(id, user.userId);

        return NextResponse.json({ message: "Game log deleted successfully" });
    } catch (error) {
        console.error("Delete game log error:", error);

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
