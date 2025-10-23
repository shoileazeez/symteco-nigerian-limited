/*
  Warnings:

  - You are about to drop the column `archived` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `company` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `emailMessageId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `htmlContent` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `inReplyTo` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `mailjetEventType` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `mailjetMessageId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `parentMessageId` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `projectLocation` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `read` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `receivedAt` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `references` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `replied` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `starred` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `textContent` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `timeline` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `toEmail` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `toName` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the `conversations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `body` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Made the column `fromName` on table `messages` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_conversationId_fkey";

-- DropForeignKey
ALTER TABLE "public"."messages" DROP CONSTRAINT "messages_parentMessageId_fkey";

-- DropIndex
DROP INDEX "public"."messages_emailMessageId_key";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "archived",
DROP COLUMN "budget",
DROP COLUMN "company",
DROP COLUMN "emailMessageId",
DROP COLUMN "htmlContent",
DROP COLUMN "inReplyTo",
DROP COLUMN "mailjetEventType",
DROP COLUMN "mailjetMessageId",
DROP COLUMN "parentMessageId",
DROP COLUMN "phone",
DROP COLUMN "projectLocation",
DROP COLUMN "read",
DROP COLUMN "receivedAt",
DROP COLUMN "references",
DROP COLUMN "replied",
DROP COLUMN "service",
DROP COLUMN "starred",
DROP COLUMN "textContent",
DROP COLUMN "timeline",
DROP COLUMN "toEmail",
DROP COLUMN "toName",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "hasAttachments" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "source" TEXT NOT NULL DEFAULT 'website',
ALTER COLUMN "type" SET DEFAULT 'contact',
ALTER COLUMN "subject" DROP NOT NULL,
ALTER COLUMN "fromName" SET NOT NULL;

-- DropTable
DROP TABLE "public"."conversations";

-- CreateIndex
CREATE INDEX "messages_fromEmail_idx" ON "messages"("fromEmail");
