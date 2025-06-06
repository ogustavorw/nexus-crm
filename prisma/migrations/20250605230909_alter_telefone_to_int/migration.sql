/*
  Warnings:

  - The `telefone` column on the `Cliente` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `telefone` column on the `Lead` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "telefone",
ADD COLUMN     "telefone" INTEGER;

-- AlterTable
ALTER TABLE "Lead" DROP COLUMN "telefone",
ADD COLUMN     "telefone" INTEGER;
