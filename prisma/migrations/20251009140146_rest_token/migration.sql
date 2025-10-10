-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "restToken" TEXT,
ADD COLUMN     "restTokenExpires" TIMESTAMP(3);
