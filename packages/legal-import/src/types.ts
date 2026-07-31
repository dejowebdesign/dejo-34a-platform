export interface ParsedParagraph {
  number: string;
  title: string | null;
  text: string;
}

export interface ParsedLawDocument {
  sourceUrl: string;
  version: string | null;
  paragraphs: ParsedParagraph[];
  warnings: string[];
}

export interface ImportSource {
  fetch(sourceUrl: string): Promise<string>;
}

export interface ParagraphSnapshot {
  id: string;
  number: string;
  checksum: string;
}

export interface ImportSummary {
  importedParagraphs: number;
  changedParagraphs: number;
  deletedParagraphs: number;
  warnings: string[];
}
