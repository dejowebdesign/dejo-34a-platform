import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavigationItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'dejo-root',
  imports: [
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly opened = signal(true);
  readonly navigation: readonly NavigationItem[] = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Themengebiete', icon: 'account_tree', route: '/topics' },
    { label: 'Gesetze', icon: 'gavel', route: '/laws' },
    { label: 'Paragraphen', icon: 'article', route: '/paragraphs' },
    { label: 'Importe', icon: 'sync', route: '/imports' },
    { label: 'Suche', icon: 'search', route: '/search' },
    { label: 'Quiz', icon: 'quiz', route: '/quiz' },
    { label: 'Präsentationen', icon: 'slideshow', route: '/presentations' },
    { label: 'KI', icon: 'auto_awesome', route: '/ai' },
    { label: 'Einstellungen', icon: 'settings', route: '/settings' }
  ];
}
