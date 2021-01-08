import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Routes } from '@angular/router'
import { MainMenuComponent } from './components/main-menu/main-menu.component'
import { RoundRobinMatchSheetComponent } from './pages/round-robin-match-sheet/round-robin-match-sheet.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component'
import { RoundRobinPageComponent } from './pages/round-robin-page/round-robin-page.component'
// import { EventPlayerListComponent } from './components/event-player-list/event-player-list.component';
// import { TournamentPageComponent } from './components/tournament/tournament-page/tournament-page.component';
// import { HeaderComponent } from './components/header/header.component';
// import { TournamentDetailsComponent } from './components/tournament/tournament-details/tournament-details.component';

const routes: Routes = [
  {
    path: "rr-grid", component: RoundRobinPageComponent,
  },
  {
    path: "rr-match-sheet", component: RoundRobinMatchSheetComponent,
  },
  // {
  //   path: "event-player-list", component: EventPlayerListComponent,
  // },
  {
    path: "dashboard", component: DashboardComponent,
  },
  {
    path: "tournament-page", component: TournamentPageComponent,
  },
  // {
  //   path: "header", component: HeaderComponent,
  // },
  {
    path: "", component: MainMenuComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
