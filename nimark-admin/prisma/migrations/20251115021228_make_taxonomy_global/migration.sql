/*
  Warnings:

  - You are about to drop the column `storeId` on the `Billboard` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Color` table. All the data in the column will be lost.
  - You are about to drop the column `storeId` on the `Size` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Billboard" DROP CONSTRAINT "Billboard_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Brand" DROP CONSTRAINT "Brand_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Color" DROP CONSTRAINT "Color_storeId_fkey";

-- DropForeignKey
ALTER TABLE "Size" DROP CONSTRAINT "Size_storeId_fkey";

-- DropIndex
DROP INDEX "Billboard_storeId_idx";

-- DropIndex
DROP INDEX "Brand_storeId_idx";

-- DropIndex
DROP INDEX "Category_storeId_idx";

-- DropIndex
DROP INDEX "Color_storeId_idx";

-- DropIndex
DROP INDEX "Size_storeId_idx";

-- AlterTable
ALTER TABLE "Billboard" DROP COLUMN "storeId";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "storeId";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "storeId";

-- AlterTable
ALTER TABLE "Color" DROP COLUMN "storeId";

-- AlterTable
ALTER TABLE "Size" DROP COLUMN "storeId";
