import Image from "next/image";
import { Stats } from "@/types/game";
import { STAT_FILTERS } from "@/lib/constants";

interface StatsOverviewProps {
    stats: Stats;
    statusFilter: string;
    setStatusFilter: (filter: string) => void;
}

export default function StatsOverview({
    stats,
    statusFilter,
    setStatusFilter,
}: StatsOverviewProps) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {STAT_FILTERS.map((stat) => {
                const isActive = statusFilter === stat.filterValue;
                return (
                    <button
                        key={stat.filterValue}
                        onClick={() =>
                            setStatusFilter(
                                isActive && stat.filterValue !== "all"
                                    ? "all"
                                    : stat.filterValue,
                            )
                        }
                        className={`flex items-center lg:gap-8 gap-4 p-4 rounded-xl bg-card cursor-pointer transition-all ${
                            isActive
                                ? "ring-2 ring-accent shadow-lg shadow-accent/10"
                                : "hover:ring-1 hover:ring-border"
                        }`}
                    >
                        <Image
                            src={stat.icon}
                            alt={stat.label}
                            width={48}
                            height={48}
                            className={`w-12 h-12 object-contain transition-opacity ${isActive ? "opacity-100" : "opacity-80"}`}
                        />
                        <div className="text-left">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
                                {stat.label}
                            </p>
                            <p className="text-2xl font-bold text-accent">
                                {stats[stat.statKey]}
                            </p>
                        </div>
                    </button>
                );
            })}
        </div>
    );
}
