import { createHash } from 'node:crypto';

export class ChangeDetectionService {
  checksum(text: string): string {
    return createHash('sha256').update(this.normalize(text), 'utf8').digest('hex');
  }

  hasChanged(previousChecksum: string | null | undefined, nextChecksum: string): boolean {
    return previousChecksum !== nextChecksum;
  }

  private normalize(text: string): string {
    return text.replace(/\r\n/g, '\n').replace(/\s+$/gm, '').trim();
  }
}

