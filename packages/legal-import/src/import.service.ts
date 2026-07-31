import { ChangeDetectionService } from './change-detection.service';
import { ParserService } from './parser.service';
import type { ImportSource, ParsedLawDocument } from './types';

export class ImportService {
  constructor(
    private readonly source: ImportSource,
    private readonly parser: ParserService,
    private readonly changes: ChangeDetectionService
  ) {}
  async load(
    sourceUrl: string
  ): Promise<{ document: ParsedLawDocument; checksums: Map<string, string> }> {
    const xml = await this.source.fetch(sourceUrl);
    const document = this.parser.parse(xml, sourceUrl);
    return {
      document,
      checksums: new Map(
        document.paragraphs.map((paragraph) => [
          paragraph.number,
          this.changes.checksum(paragraph.text)
        ])
      )
    };
  }
}
