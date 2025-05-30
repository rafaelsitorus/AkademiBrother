/*
  Warnings:

  - Added the required column `HospitalID` to the `BPJSClaim` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BPJSClaim" ADD COLUMN     "HospitalID" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "BPJSClaim" ADD CONSTRAINT "BPJSClaim_HospitalID_fkey" FOREIGN KEY ("HospitalID") REFERENCES "Hospital"("HospitalID") ON DELETE RESTRICT ON UPDATE CASCADE;
