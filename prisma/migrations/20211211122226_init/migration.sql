-- CreateTable
CREATE TABLE `Users` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `phone` VARCHAR(13) NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Users_phone_key`(`phone`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Roles` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Roles_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RolesOnUsers` (
    `A` BIGINT NOT NULL,
    `B` BIGINT NOT NULL,

    UNIQUE INDEX `_RolesOnUsers_AB_unique`(`A`, `B`),
    INDEX `_RolesOnUsers_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RolesOnUsers` ADD FOREIGN KEY (`A`) REFERENCES `Roles`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RolesOnUsers` ADD FOREIGN KEY (`B`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
