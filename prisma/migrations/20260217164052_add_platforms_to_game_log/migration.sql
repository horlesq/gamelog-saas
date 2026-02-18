/*
  Warnings:

  - You are about to drop the column `platform` on the `game_logs` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game_logs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'PLAN_TO_PLAY',
    "rating" INTEGER,
    "hoursPlayed" REAL,
    "platforms" TEXT,
    "notes" TEXT,
    "startedAt" DATETIME,
    "completedAt" DATETIME,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "game_logs_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "games" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "game_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_game_logs" ("completedAt", "createdAt", "gameId", "hoursPlayed", "id", "notes", "rating", "startedAt", "status", "updatedAt", "userId", "platforms") SELECT "completedAt", "createdAt", "gameId", "hoursPlayed", "id", "notes", "rating", "startedAt", "status", "updatedAt", "userId", CASE WHEN "platform" IS NOT NULL THEN '["' || "platform" || '"]' ELSE NULL END FROM "game_logs";
DROP TABLE "game_logs";
ALTER TABLE "new_game_logs" RENAME TO "game_logs";
CREATE UNIQUE INDEX "game_logs_gameId_userId_key" ON "game_logs"("gameId", "userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
