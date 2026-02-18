import type { Metadata, Viewport } from "next";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/theme/Providers";

const orbitron = Orbitron({
    variable: "--font-orbitron",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
});

const exo2 = Exo_2({
    variable: "--font-exo2",
    subsets: ["latin"],
    weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
    title: "GameLog",
    description:
        "Track your gaming journey — log games you've played and want to play",
    icons: {
        icon: "/favicon.ico",
    },
    appleWebApp: {
        title: "GameLog",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${orbitron.variable} ${exo2.variable} antialiased font-exo2`}
            >
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
