-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "address" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "phone" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "trxId" TEXT;
