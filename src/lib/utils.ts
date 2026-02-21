import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const statusColors: Record<string, string> = {
    PLAN_TO_PLAY:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    PLAYING:
        "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    COMPLETED:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
};

export const formatStatus = (status: string) => {
    return status.replace(/_/g, " ");
};
