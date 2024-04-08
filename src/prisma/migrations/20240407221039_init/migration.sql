/*
  Warnings:

  - Added the required column `userId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Follower" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followedId" TEXT NOT NULL,
    CONSTRAINT "Follower_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Follower_followedId_fkey" FOREIGN KEY ("followedId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Follower" ("followedId", "followerId", "id") SELECT "followedId", "followerId", "id" FROM "Follower";
DROP TABLE "Follower";
ALTER TABLE "new_Follower" RENAME TO "Follower";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
