-- Preserve the initial Law Engine schema while adding immutable import provenance.
ALTER TABLE "Paragraph" ADD COLUMN "currentChecksum" TEXT;
ALTER TABLE "Paragraph" ADD COLUMN "sourceUrl" TEXT;
ALTER TABLE "Paragraph" ADD COLUMN "lastImportedAt" TIMESTAMP(3);

UPDATE "Paragraph"
SET
  "currentChecksum" = md5("currentText"),
  "sourceUrl" = COALESCE((SELECT "source" FROM "Law" WHERE "Law"."id" = "Paragraph"."lawId"), ''),
  "lastImportedAt" = CURRENT_TIMESTAMP;

ALTER TABLE "Paragraph" ALTER COLUMN "currentChecksum" SET NOT NULL;
ALTER TABLE "Paragraph" ALTER COLUMN "sourceUrl" SET NOT NULL;
ALTER TABLE "Paragraph" ALTER COLUMN "lastImportedAt" SET NOT NULL;

ALTER TABLE "ParagraphVersion" ADD COLUMN "checksum" TEXT;
ALTER TABLE "ParagraphVersion" ADD COLUMN "sourceUrl" TEXT;
UPDATE "ParagraphVersion"
SET
  "checksum" = md5("text"),
  "sourceUrl" = COALESCE((SELECT "sourceUrl" FROM "Paragraph" WHERE "Paragraph"."id" = "ParagraphVersion"."paragraphId"), '');
ALTER TABLE "ParagraphVersion" ALTER COLUMN "checksum" SET NOT NULL;
ALTER TABLE "ParagraphVersion" ALTER COLUMN "sourceUrl" SET NOT NULL;

ALTER TABLE "ImportJob" ADD COLUMN "deletedParagraphs" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "ImportJob" ADD COLUMN "duration" INTEGER;
ALTER TABLE "ImportJob" ADD COLUMN "errors" JSONB;
ALTER TABLE "ImportJob" ADD COLUMN "warnings" JSONB;
