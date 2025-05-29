-- DropForeignKey
ALTER TABLE "Donation" DROP CONSTRAINT "Donation_campaignId_fkey";

-- AlterTable
ALTER TABLE "Campaign" ADD COLUMN     "isClosed" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;
