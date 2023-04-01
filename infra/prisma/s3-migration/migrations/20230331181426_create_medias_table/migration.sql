-- CreateTable
CREATE TABLE "Medias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "uploaded" BOOLEAN NOT NULL DEFAULT false
);
