import { Routes } from '@angular/router';
import { PlaceholderPageComponent } from './core/placeholder-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: PlaceholderPageComponent, data: { title: 'Dashboard' } },
  { path: 'topics', component: PlaceholderPageComponent, data: { title: 'Themengebiete' } },
  { path: 'laws', component: PlaceholderPageComponent, data: { title: 'Gesetze' } },
  { path: 'search', component: PlaceholderPageComponent, data: { title: 'Suche' } },
  { path: 'quiz', component: PlaceholderPageComponent, data: { title: 'Quiz' } },
  { path: 'presentations', component: PlaceholderPageComponent, data: { title: 'Präsentationen' } },
  { path: 'ai', component: PlaceholderPageComponent, data: { title: 'KI' } },
  { path: 'settings', component: PlaceholderPageComponent, data: { title: 'Einstellungen' } },
  { path: '**', redirectTo: 'dashboard' }
];

