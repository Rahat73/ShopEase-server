/*
  Warnings:

  - You are about to drop the column `adminId` on the `review_replies` table. All the data in the column will be lost.
  - You are about to drop the column `customerId` on the `review_replies` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[reviewId]` on the table `review_replies` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[reviewId,vendorId]` on the table `review_replies` will be added. If there are existing duplicate values, this will fail.
  - Made the column `vendorId` on table `review_replies` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "review_replies" DROP CONSTRAINT "review_replies_adminId_fkey";

-- DropForeignKey
ALTER TABLE "review_replies" DROP CONSTRAINT "review_replies_customerId_fkey";

-- DropForeignKey
ALTER TABLE "review_replies" DROP CONSTRAINT "review_replies_reviewId_fkey";

-- DropForeignKey
ALTER TABLE "review_replies" DROP CONSTRAINT "review_replies_vendorId_fkey";

-- AlterTable
ALTER TABLE "review_replies" DROP COLUMN "adminId",
DROP COLUMN "customerId",
ALTER COLUMN "vendorId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "review_replies_reviewId_key" ON "review_replies"("reviewId");

-- CreateIndex
CREATE UNIQUE INDEX "review_replies_reviewId_vendorId_key" ON "review_replies"("reviewId", "vendorId");

-- AddForeignKey
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_reviewId_fkey" FOREIGN KEY ("reviewId") REFERENCES "reviews"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review_replies" ADD CONSTRAINT "review_replies_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
