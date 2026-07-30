import { AsyncPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';

interface ParagraphVersionRow { version: string; importedAt: string; checksum: string; }

@Component({
  imports: [AsyncPipe, MatTableModule],
  templateUrl: './paragraph-history.component.html',
  styleUrl: '../law-engine-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParagraphHistoryComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly http = inject(HttpClient);
  readonly displayedColumns = ['version', 'importedAt', 'checksum', 'difference'];
  readonly versions$ = this.route.paramMap.pipe(switchMap((params) => this.http.get<ParagraphVersionRow[]>(`/api/paragraph-versions?paragraphId=${encodeURIComponent(params.get('id') ?? '')}`)), catchError(() => of([])));
}
