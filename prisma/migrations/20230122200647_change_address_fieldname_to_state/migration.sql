/*
  Warnings:

  - You are about to drop the column `State` on the `address` table. All the data in the column will be lost.
  - Added the required column `state` to the `address` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `address` DROP COLUMN `State`,
    ADD COLUMN `state` VARCHAR(191) NOT NULL;
