-- CreateEnum
CREATE TYPE "Status" AS ENUM ('NOTSTARTED', 'INPROGRESS', 'DONE');

-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOTSTARTED';

-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'NOTSTARTED';
