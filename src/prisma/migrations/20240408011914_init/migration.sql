/*
  Warnings:

  - You are about to drop the column `userId` on the `UserRelation` table. All the data in the column will be lost.
  - Added the required column `followingId` to the `UserRelation` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserRelation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "followingId" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    CONSTRAINT "UserRelation_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserRelation_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UserRelation" ("followerId", "id") SELECT "followerId", "id" FROM "UserRelation";
DROP TABLE "UserRelation";
ALTER TABLE "new_UserRelation" RENAME TO "UserRelation";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
