import { CreateGameLogData, UpdateGameLogData } from "@/types";

export async function searchGames(query: string, page: number = 1) {
    const params = new URLSearchParams({ q: query, page: page.toString() });
    const response = await fetch(`/api/games/search?${params}`);

    if (!response.ok) {
        throw new Error("Failed to search games");
    }

    return response.json();
}

export async function getGameLogs(search?: string, status?: string) {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (status && status !== "all") params.append("status", status);

    const response = await fetch(`/api/game-logs?${params}`);

    if (!response.ok) {
        if (response.status === 401) {
            throw new Error("Authentication required - 401");
        }
        throw new Error("Failed to fetch game logs");
    }

    return response.json();
}

export async function createGameLog(data: CreateGameLogData) {
    const response = await fetch("/api/game-logs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create game log");
    }

    return response.json();
}

export async function updateGameLog(id: string, data: UpdateGameLogData) {
    const response = await fetch(`/api/game-logs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update game log");
    }

    return response.json();
}

export async function deleteGameLog(id: string) {
    const response = await fetch(`/api/game-logs/${id}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete game log");
    }

    return response.json();
}
