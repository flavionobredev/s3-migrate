/*
  Warnings:

  - The primary key for the `medias` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_medias" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "uploaded" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_medias" ("id", "name", "uploaded") SELECT "id", "name", "uploaded" FROM "medias";
DROP TABLE "medias";
ALTER TABLE "new_medias" RENAME TO "medias";
CREATE UNIQUE INDEX "medias_name_key" ON "medias"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
