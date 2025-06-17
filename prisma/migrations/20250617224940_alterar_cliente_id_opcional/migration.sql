-- DropForeignKey
ALTER TABLE "Lead" DROP CONSTRAINT "Lead_clienteId_fkey";

-- AlterTable
ALTER TABLE "Lead" ALTER COLUMN "clienteId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("id") ON DELETE SET NULL ON UPDATE CASCADE;
