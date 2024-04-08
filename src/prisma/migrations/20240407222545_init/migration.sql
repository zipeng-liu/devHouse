/*
  Warnings:

  - You are about to drop the column `followedId` on the `Follower` table. All the data in the column will be lost.
  - You are about to drop the column `followerId` on the `Follower` table. All the data in the column will be lost.
  - Added the required column `followingId` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Follower" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,
    CONSTRAINT "Follower_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Follower" ("id", "userId") SELECT "id", "userId" FROM "Follower";
DROP TABLE "Follower";
ALTER TABLE "new_Follower" RENAME TO "Follower";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
