/*
  Warnings:

  - You are about to drop the column `restToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `restTokenExpires` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "restToken",
DROP COLUMN "restTokenExpires",
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpires" TIMESTAMP(3);
