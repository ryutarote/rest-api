/*
  Warnings:

  - You are about to drop the column `content` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "content",
DROP COLUMN "status",
ADD COLUMN     "description" TEXT;
