export const SORT_OPTIONS = [
    { value: "date", label: "Date Added" },
    { value: "name", label: "Name (A-Z)" },
    { value: "release", label: "Release Date" },
    { value: "rating", label: "Highest Rated" },
    { value: "time", label: "Time Played" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];

export const STAT_FILTERS = [
    {
        filterValue: "all",
        label: "Total",
        statKey: "total" as const,
        icon: "/3d/flash.png",
    },
    {
        filterValue: "PLAN_TO_PLAY",
        label: "Plan to Play",
        statKey: "planToPlay" as const,
        icon: "/3d/file.png",
    },
    {
        filterValue: "PLAYING",
        label: "Playing",
        statKey: "playing" as const,
        icon: "/3d/puzzle.png",
    },
    {
        filterValue: "COMPLETED",
        label: "Completed",
        statKey: "completed" as const,
        icon: "/3d/crown.png",
    },
];
