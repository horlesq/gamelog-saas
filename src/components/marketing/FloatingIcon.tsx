"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingIconProps {
    children: ReactNode;
    className?: string;
    yOffset?: number;
    duration?: number;
    delay?: number;
}

export function FloatingIcon({
    children,
    className = "",
    yOffset = 20,
    duration = 6,
    delay = 0,
}: FloatingIconProps) {
    return (
        <motion.div
            className={className}
            animate={{ y: [0, yOffset, 0] }}
            transition={{
                repeat: Infinity,
                duration,
                ease: "easeInOut",
                delay,
            }}
        >
            {children}
        </motion.div>
    );
}
