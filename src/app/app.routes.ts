import { Routes } from '@angular/router';
import { CardsListComponent } from '../cards/cards-list/cards-list.component';
import { DashboardPageComponent } from '../dashboard/dashboard-page/dashboard-page.component';
import { GameBoardComponent } from '../play/game-board/game-board.component';
import { SaintPageComponent } from '../saints/saint-page/saint-page.component';

export const routes: Routes = [
  {
    path: 'cards-list',
    component: CardsListComponent,
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
  },
  {
    path: 'game/:mode',
    component: GameBoardComponent,
  },
  {
    path: 'saints',
    component: SaintPageComponent,
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard',
  },
];
