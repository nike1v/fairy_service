/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `clients` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phone]` on the table `clients` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `clients_clientId_key` ON `clients`(`clientId`);

-- CreateIndex
CREATE UNIQUE INDEX `clients_email_key` ON `clients`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `clients_phone_key` ON `clients`(`phone`);
