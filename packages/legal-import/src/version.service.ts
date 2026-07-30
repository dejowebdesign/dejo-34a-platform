export class VersionService {
  createVersionLabel(sourceVersion: string | null, importedAt: Date): string {
    return sourceVersion?.trim() || importedAt.toISOString();
  }
}

