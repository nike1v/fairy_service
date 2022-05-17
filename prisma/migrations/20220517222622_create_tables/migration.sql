-- CreateTable
CREATE TABLE `clients` (
    `clientId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(250) NOT NULL,
    `lastName` VARCHAR(250) NOT NULL,
    `email` VARCHAR(250) NOT NULL,
    `phone` VARCHAR(250) NOT NULL,
    `password` VARCHAR(250) NOT NULL,
    `isActive` CHAR(1) NOT NULL DEFAULT '1',
    `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `expires` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `admin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `clients_clientId_key`(`clientId`),
    UNIQUE INDEX `clients_email_key`(`email`),
    UNIQUE INDEX `clients_phone_key`(`phone`),
    PRIMARY KEY (`clientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `serviceId` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(250) NOT NULL,

    UNIQUE INDEX `services_serviceId_key`(`serviceId`),
    UNIQUE INDEX `services_title_key`(`title`),
    PRIMARY KEY (`serviceId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff` (
    `staffId` INTEGER NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(250) NOT NULL,
    `serviceId` INTEGER NOT NULL,

    UNIQUE INDEX `staff_staffId_key`(`staffId`),
    PRIMARY KEY (`staffId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `orderId` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(250) NOT NULL DEFAULT 'work',
    `serviceId` INTEGER NOT NULL,
    `staffId` INTEGER NOT NULL,
    `clientId` INTEGER NOT NULL,

    UNIQUE INDEX `orders_orderId_key`(`orderId`),
    PRIMARY KEY (`orderId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
