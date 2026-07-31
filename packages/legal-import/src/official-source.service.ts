import AdmZip from 'adm-zip';
import type { ImportSource } from './types';

/** Downloads the official XML/ZIP export from Gesetze im Internet; no HTML scraping is used. */
export class OfficialXmlSourceService implements ImportSource {
  async fetch(sourceUrl: string): Promise<string> {
    const response = await fetch(sourceUrl, {
      headers: { Accept: 'application/xml, application/zip' }
    });
    if (!response.ok) throw new Error(`Official source returned HTTP ${response.status}.`);
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.subarray(0, 2).toString('utf8') === 'PK') return this.extractXml(bytes);
    return bytes.toString('utf8');
  }

  private extractXml(archive: Buffer): string {
    const entry = new AdmZip(archive)
      .getEntries()
      .find(
        (candidate) => !candidate.isDirectory && candidate.entryName.toLowerCase().endsWith('.xml')
      );
    if (!entry) throw new Error('Official XML ZIP does not contain an XML document.');
    return entry.getData().toString('utf8');
  }
}
