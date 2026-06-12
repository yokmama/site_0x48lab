-- AlterTable
ALTER TABLE "TeamMember" ADD COLUMN     "photoFileId" INTEGER;

-- CreateTable
CREATE TABLE "MediaFile" (
    "id" SERIAL NOT NULL,
    "filename" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "data" BYTEA NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MediaFile_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TeamMember" ADD CONSTRAINT "TeamMember_photoFileId_fkey" FOREIGN KEY ("photoFileId") REFERENCES "MediaFile"("id") ON DELETE SET NULL ON UPDATE CASCADE;
