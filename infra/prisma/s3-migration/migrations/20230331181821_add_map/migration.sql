/*
  Warnings:

  - You are about to drop the `Medias` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Medias";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "medias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "uploaded" BOOLEAN NOT NULL DEFAULT false
);
