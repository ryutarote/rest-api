/*
  Warnings:

  - You are about to drop the column `hashedPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `nickName` on the `User` table. All the data in the column will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "completed" BOOLEAN DEFAULT false;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "hashedPassword",
DROP COLUMN "nickName",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT NOT NULL;
