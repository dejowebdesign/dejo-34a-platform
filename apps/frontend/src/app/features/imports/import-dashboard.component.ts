import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { catchError, forkJoin, map, of } from 'rxjs';

interface LawRow { abbreviation: string; version: string | null; source: string | null; }
interface ImportJobRow { startedAt: string; law: { abbreviation: string }; status: string; importedParagraphs: number; changedParagraphs: number; }
interface ImportStatus { schedulerEnabled: boolean; jobs: ImportJobRow[]; }

@Component({
  imports: [AsyncPipe, MatCardModule, MatTableModule],
  templateUrl: './import-dashboard.component.html',
  styleUrl: './import-dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImportDashboardComponent {
  private readonly http = inject(HttpClient);
  readonly lawColumns = ['abbreviation', 'version', 'source'];
  readonly historyColumns = ['startedAt', 'law', 'status', 'imported', 'changed'];
  readonly changeColumns = ['startedAt', 'law', 'changed'];
  readonly dashboard$ = forkJoin({
    laws: this.http.get<LawRow[]>('/api/laws'),
    history: this.http.get<ImportJobRow[]>('/api/import-jobs/history'),
    status: this.http.get<ImportStatus>('/api/import-jobs/status')
  }).pipe(
    map((dashboard) => ({ ...dashboard, changed: dashboard.history.filter((job) => job.changedParagraphs > 0), changedCount: dashboard.history.reduce((sum, job) => sum + job.changedParagraphs, 0) })),
    catchError(() => of({ laws: [], history: [], status: { schedulerEnabled: false, jobs: [] }, changed: [], changedCount: 0 }))
  );
}
