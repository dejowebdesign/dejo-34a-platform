import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  imports: [AsyncPipe, MatCardModule],
  template: `<section>
    <h1>{{ title$ | async }}</h1>
    <mat-card appearance="outlined"
      ><mat-card-content>Dieser Bereich wird vorbereitet.</mat-card-content></mat-card
    >
  </section>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlaceholderPageComponent {
  private readonly route = inject(ActivatedRoute);
  readonly title$ = this.route.data.pipe(map((data) => data['title'] as string));
}
