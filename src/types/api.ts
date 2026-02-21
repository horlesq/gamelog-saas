import { GameLog } from "./game";

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export interface GameLogsResponse {
    gameLogs: GameLog[];
}
