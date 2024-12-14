/*
  Warnings:

  - A unique constraint covering the columns `[orderId,customerId,productId]` on the table `reviews` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "reviews_customerId_productId_key";

-- AlterTable
ALTER TABLE "reviews" ADD COLUMN     "orderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_orderId_customerId_productId_key" ON "reviews"("orderId", "customerId", "productId");

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
