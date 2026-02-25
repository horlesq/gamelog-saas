import LandingPage from "@/components/marketing/LandingPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "GameLog – Level Up Your Game Library",
    description:
        "GameLog is the ultimate personal gaming library manager. Track your backlog, log what you're playing, rate your favorites, and discover what to play next – all in one beautifully designed space.",
    keywords: [
        "game tracker",
        "game library",
        "backlog manager",
        "video games",
        "gaming",
        "gamelog",
    ],
    openGraph: {
        title: "GameLog – Level Up Your Game Library",
        description:
            "Track your backlog, log what you're playing, and discover what to play next.",
        type: "website",
    },
};

export default function HomePage() {
    return <LandingPage />;
}
