import { prisma } from "../db";

export class AdminService {
    static async getSystemStats() {
        const [totalUsers, totalGameLogs, adminUsers] = await Promise.all([
            prisma.user.count(),
            prisma.gameLog.count(),
            prisma.user.count({ where: { isAdmin: true } }),
        ]);

        const recentUsers = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                createdAt: true,
            },
            orderBy: { createdAt: "desc" },
            take: 5,
        });

        const recentGameLogs = await prisma.gameLog.findMany({
            select: {
                id: true,
                status: true,
                createdAt: true,
                game: {
                    select: {
                        name: true,
                    },
                },
                user: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
            take: 5,
        });

        return {
            totalUsers,
            totalGameLogs,
            adminUsers,
            recentUsers,
            recentGameLogs,
        };
    }

    static async getUserAnalytics() {
        const usersWithGameLogCounts = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                isAdmin: true,
                createdAt: true,
                _count: {
                    select: {
                        gameLogs: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });

        const gameLogCounts = usersWithGameLogCounts.map(
            (user) => user._count.gameLogs,
        );
        const maxGameLogs = Math.max(...gameLogCounts, 0);
        const avgGameLogs =
            gameLogCounts.length > 0
                ? gameLogCounts.reduce((a, b) => a + b, 0) /
                  gameLogCounts.length
                : 0;

        return {
            users: usersWithGameLogCounts,
            analytics: {
                totalUsers: usersWithGameLogCounts.length,
                maxGameLogsPerUser: maxGameLogs,
                avgGameLogsPerUser: Math.round(avgGameLogs * 100) / 100,
                activeUsers: usersWithGameLogCounts.filter(
                    (user) => user._count.gameLogs > 0,
                ).length,
            },
        };
    }

    static async getGameLogAnalytics() {
        const gameLogs = await prisma.gameLog.findMany({
            select: {
                id: true,
                status: true,
                createdAt: true,
                updatedAt: true,
                game: {
                    select: {
                        name: true,
                    },
                },
                user: {
                    select: {
                        email: true,
                        name: true,
                    },
                },
            },
            orderBy: { updatedAt: "desc" },
        });

        const statusCounts = gameLogs.reduce(
            (acc, log) => {
                acc[log.status] = (acc[log.status] || 0) + 1;
                return acc;
            },
            {} as Record<string, number>,
        );

        return {
            gameLogs,
            analytics: {
                totalGameLogs: gameLogs.length,
                statusDistribution: statusCounts,
                recentActivity: gameLogs.slice(0, 10),
            },
        };
    }

    static async cleanupOrphanedData() {
        try {
            const totalGameLogs = await prisma.gameLog.count();
            const totalUsers = await prisma.user.count();
            const totalGames = await prisma.game.count();

            return {
                totalGameLogs,
                totalUsers,
                totalGames,
                message: `System healthy. ${totalGameLogs} game logs, ${totalGames} games, and ${totalUsers} users.`,
            };
        } catch (error) {
            return {
                message: `Health check failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            };
        }
    }

    static async getSystemHealth() {
        try {
            await prisma.user.findFirst();

            return {
                status: "healthy",
                database: "healthy",
                timestamp: new Date().toISOString(),
                uptime: process.uptime(),
            };
        } catch (error) {
            return {
                status: "unhealthy",
                database: "error",
                timestamp: new Date().toISOString(),
                error: error instanceof Error ? error.message : "Unknown error",
            };
        }
    }

    static async validateUserDeletion(
        currentUserId: string,
        userIdToDelete: string,
    ) {
        if (currentUserId === userIdToDelete) {
            throw new Error("Cannot delete your own account");
        }

        const userToDelete = await prisma.user.findUnique({
            where: { id: userIdToDelete },
            select: { id: true, isAdmin: true },
        });

        if (!userToDelete) {
            throw new Error("User not found");
        }

        if (userToDelete.isAdmin) {
            const adminCount = await prisma.user.count({
                where: { isAdmin: true },
            });

            if (adminCount <= 1) {
                throw new Error(
                    "Cannot delete the last admin user. At least one admin must exist.",
                );
            }
        }

        return userToDelete;
    }
}
