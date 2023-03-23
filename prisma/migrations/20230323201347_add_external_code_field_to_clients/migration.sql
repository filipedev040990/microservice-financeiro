/*
  Warnings:

  - Added the required column `external_code` to the `clients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `clients` ADD COLUMN `external_code` VARCHAR(191) NOT NULL;
