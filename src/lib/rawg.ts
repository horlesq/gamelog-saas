import { RAWGSearchResponse, RAWGGame } from "@/types/game";

const RAWG_BASE_URL = "https://api.rawg.io/api";

function getApiKey(): string {
    const key = process.env.RAWG_API_KEY;
    if (!key) {
        throw new Error(
            "RAWG_API_KEY is not configured. Get a free key at https://rawg.io/apidocs",
        );
    }
    return key;
}

export async function searchGames(
    query: string,
    page: number = 1,
): Promise<RAWGSearchResponse> {
    const apiKey = getApiKey();
    const params = new URLSearchParams({
        key: apiKey,
        search: query,
        page: page.toString(),
        page_size: "20",
    });

    const response = await fetch(`${RAWG_BASE_URL}/games?${params}`);

    if (!response.ok) {
        throw new Error(`RAWG API error: ${response.status}`);
    }

    return response.json();
}

export async function getGameDetails(rawgId: number): Promise<RAWGGame> {
    const apiKey = getApiKey();
    const response = await fetch(
        `${RAWG_BASE_URL}/games/${rawgId}?key=${apiKey}`,
    );

    if (!response.ok) {
        throw new Error(`RAWG API error: ${response.status}`);
    }

    return response.json();
}
