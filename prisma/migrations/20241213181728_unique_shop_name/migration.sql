/*
  Warnings:

  - A unique constraint covering the columns `[shopName]` on the table `vendors` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "vendors_shopName_key" ON "vendors"("shopName");
