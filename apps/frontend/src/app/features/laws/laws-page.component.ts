import type { AfterViewInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';

interface LawRow {
  id: string;
  abbreviation: string;
  name: string;
  version: string | null;
}

@Component({
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    RouterLink
  ],
  templateUrl: './laws-page.component.html',
  styleUrl: '../law-engine-table.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LawsPageComponent implements AfterViewInit {
  readonly displayedColumns = ['abbreviation', 'name', 'version', 'actions'];
  readonly dataSource = new MatTableDataSource<LawRow>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(value: string): void {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
