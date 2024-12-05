-- CreateTable
CREATE TABLE "follows" (
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "customerId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,

    CONSTRAINT "follows_pkey" PRIMARY KEY ("customerId","vendorId")
);

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follows" ADD CONSTRAINT "follows_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
