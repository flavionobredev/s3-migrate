/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `medias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "medias_name_key" ON "medias"("name");
