ALTER TABLE "ContactInquiry"
ADD COLUMN "lastRepliedAt" TIMESTAMP(3),
ADD COLUMN "lastRepliedById" INTEGER;

CREATE TABLE "ContactInquiryReply" (
  "id" TEXT NOT NULL,
  "inquiryId" TEXT NOT NULL,
  "adminUserId" INTEGER,
  "toEmail" TEXT NOT NULL,
  "fromEmail" TEXT NOT NULL,
  "subject" TEXT NOT NULL,
  "body" TEXT NOT NULL,
  "deliveryStatus" TEXT NOT NULL DEFAULT 'sent',
  "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ContactInquiryReply_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContactInquiry_lastRepliedById_idx" ON "ContactInquiry"("lastRepliedById");
CREATE INDEX "ContactInquiryReply_inquiryId_sentAt_idx" ON "ContactInquiryReply"("inquiryId", "sentAt");
CREATE INDEX "ContactInquiryReply_adminUserId_idx" ON "ContactInquiryReply"("adminUserId");

ALTER TABLE "ContactInquiry"
ADD CONSTRAINT "ContactInquiry_lastRepliedById_fkey"
FOREIGN KEY ("lastRepliedById") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "ContactInquiryReply"
ADD CONSTRAINT "ContactInquiryReply_inquiryId_fkey"
FOREIGN KEY ("inquiryId") REFERENCES "ContactInquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "ContactInquiryReply"
ADD CONSTRAINT "ContactInquiryReply_adminUserId_fkey"
FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
