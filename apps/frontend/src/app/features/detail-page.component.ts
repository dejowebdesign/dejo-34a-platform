import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';

@Component({
  imports: [MatCardModule],
  template: `<section><h1>{{ title }}</h1><mat-card appearance="outlined"><mat-card-content>Die Detailansicht wird vorbereitet.</mat-card-content></mat-card></section>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailPageComponent {
  readonly title = inject(ActivatedRoute).snapshot.data['title'] as string;
}
