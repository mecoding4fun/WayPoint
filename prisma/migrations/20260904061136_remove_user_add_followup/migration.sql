/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_userId_fkey";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "FollowUp" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "note" TEXT,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "FollowUp_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FollowUp_applicationId_idx" ON "FollowUp"("applicationId");

-- CreateIndex
CREATE INDEX "Application_userId_idx" ON "Application"("userId");

-- AddForeignKey
ALTER TABLE "FollowUp" ADD CONSTRAINT "FollowUp_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
