CREATE TABLE "ContactInquiry" (
  "id" TEXT NOT NULL,
  "company" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "inquiryType" TEXT,
  "budgetRange" TEXT,
  "timeline" TEXT,
  "message" TEXT NOT NULL,
  "sourcePath" TEXT,
  "utm" JSONB,
  "privacyConsent" BOOLEAN NOT NULL DEFAULT false,
  "privacyConsentAt" TIMESTAMP(3),
  "status" TEXT NOT NULL DEFAULT 'new',
  "adminNotes" TEXT,
  "notificationAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "ContactInquiry_status_createdAt_idx" ON "ContactInquiry"("status", "createdAt");
CREATE INDEX "ContactInquiry_email_idx" ON "ContactInquiry"("email");
