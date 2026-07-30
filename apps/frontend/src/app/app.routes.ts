import { Routes } from '@angular/router';
import { PlaceholderPageComponent } from './core/placeholder-page.component';
import { DetailPageComponent } from './features/detail-page.component';
import { LawsPageComponent } from './features/laws/laws-page.component';
import { ParagraphsPageComponent } from './features/paragraphs/paragraphs-page.component';
import { TopicsPageComponent } from './features/topics/topics-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: PlaceholderPageComponent, data: { title: 'Dashboard' } },
  { path: 'topics', component: TopicsPageComponent },
  { path: 'topics/:id', component: DetailPageComponent, data: { title: 'Themengebiet' } },
  { path: 'laws', component: LawsPageComponent },
  { path: 'laws/:id', component: DetailPageComponent, data: { title: 'Gesetz' } },
  { path: 'paragraphs', component: ParagraphsPageComponent },
  { path: 'paragraphs/:id', component: DetailPageComponent, data: { title: 'Paragraph' } },
  { path: 'search', component: PlaceholderPageComponent, data: { title: 'Suche' } },
  { path: 'quiz', component: PlaceholderPageComponent, data: { title: 'Quiz' } },
  { path: 'presentations', component: PlaceholderPageComponent, data: { title: 'Präsentationen' } },
  { path: 'ai', component: PlaceholderPageComponent, data: { title: 'KI' } },
  { path: 'settings', component: PlaceholderPageComponent, data: { title: 'Einstellungen' } },
  { path: '**', redirectTo: 'dashboard' }
];
