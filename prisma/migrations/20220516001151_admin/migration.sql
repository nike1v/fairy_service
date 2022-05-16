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

    PRIMARY KEY (`clientId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
