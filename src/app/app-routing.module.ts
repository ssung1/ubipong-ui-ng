import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { RoundRobinGridComponent } from './components/round-robin-grid/round-robin-grid.component'
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { RoundRobinMatchSheetComponent } from './components/round-robin-match-sheet/round-robin-match-sheet.component';
import { EventPlayerListComponent } from './components/event-player-list/event-player-list.component';
import { TournamentPageComponent } from './components/tournament/tournament-page/tournament-page.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path: "rr-grid", component: RoundRobinGridComponent,
  },
  {
    path: "rr-match-sheet", component: RoundRobinMatchSheetComponent,
  },
  {
    path: "event-player-list", component: EventPlayerListComponent,
  },
  {
    path: "tournament-list", component: TournamentPageComponent,
  },
  {
    path: "header", component: HeaderComponent,
  },
  {
    path: "", component: MainMenuComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
