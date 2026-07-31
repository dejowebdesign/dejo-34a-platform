import { XMLParser } from 'fast-xml-parser';
import type { ParsedLawDocument, ParsedParagraph } from './types';

/** Parses the official Gesetze-im-Internet XML structure. HTML is intentionally not parsed here. */
export class ParserService {
  private readonly parser = new XMLParser({
    ignoreAttributes: false,
    trimValues: true,
    parseTagValue: false
  });

  parse(xml: string, sourceUrl: string): ParsedLawDocument {
    const document = this.parser.parse(xml) as Record<string, unknown>;
    const normNodes = this.findNodes(document, 'norm');
    const paragraphs = normNodes
      .map((node) => this.toParagraph(node))
      .filter((value): value is ParsedParagraph => value !== null);
    return {
      sourceUrl,
      version: this.findFirstText(document, ['standangabe', 'stand', 'fassung']) ?? null,
      paragraphs,
      warnings:
        paragraphs.length === 0
          ? ['No paragraph nodes were found in the official XML document.']
          : []
    };
  }

  private toParagraph(node: Record<string, unknown>): ParsedParagraph | null {
    const number = this.findFirstText(node, ['enbez', 'gliederungbez', 'nummer']);
    if (!number || !number.startsWith('§')) return null;
    const title = this.findFirstText(node, ['kurzue', 'langue', 'titel']) ?? null;
    const text = this.collectText(this.findFirst(node, ['textdaten', 'text']) ?? node);
    return text ? { number, title, text } : null;
  }

  private findNodes(value: unknown, key: string): Record<string, unknown>[] {
    if (Array.isArray(value)) return value.flatMap((item) => this.findNodes(item, key));
    if (!value || typeof value !== 'object') return [];
    return Object.entries(value as Record<string, unknown>).flatMap(([name, child]) => [
      ...(name.toLowerCase() === key ? this.asObjects(child) : []),
      ...this.findNodes(child, key)
    ]);
  }

  private findFirst(value: unknown, keys: string[]): unknown {
    if (Array.isArray(value)) return value.map((item) => this.findFirst(item, keys)).find(Boolean);
    if (!value || typeof value !== 'object') return undefined;
    for (const [name, child] of Object.entries(value as Record<string, unknown>)) {
      if (keys.includes(name.toLowerCase())) return child;
      const nested = this.findFirst(child, keys);
      if (nested !== undefined) return nested;
    }
    return undefined;
  }

  private findFirstText(value: unknown, keys: string[]): string | undefined {
    const found = this.findFirst(value, keys);
    return found ? this.collectText(found) || undefined : undefined;
  }

  private collectText(value: unknown): string {
    if (typeof value === 'string' || typeof value === 'number') return String(value);
    if (Array.isArray(value))
      return value
        .map((item) => this.collectText(item))
        .filter(Boolean)
        .join('\n');
    if (!value || typeof value !== 'object') return '';
    return Object.entries(value as Record<string, unknown>)
      .filter(([key]) => !key.startsWith('@_'))
      .map(([, child]) => this.collectText(child))
      .filter(Boolean)
      .join('\n');
  }

  private asObjects(value: unknown): Record<string, unknown>[] {
    return (Array.isArray(value) ? value : [value]).filter(
      (item): item is Record<string, unknown> => Boolean(item) && typeof item === 'object'
    );
  }
}
