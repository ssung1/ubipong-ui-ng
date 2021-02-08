import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { Routes } from '@angular/router'
import { RoundRobinMatchSheetComponent } from './pages/round-robin-match-sheet/round-robin-match-sheet.component'
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component'
import { RoundRobinPageComponent } from './pages/round-robin-page/round-robin-page.component'
import { EventPlayerListComponent } from './components/event-player-list/event-player-list.component'

const routes: Routes = [
  {
    path: "rr-grid", component: RoundRobinPageComponent,
  },
  {
    path: "rr-match-sheet", component: RoundRobinMatchSheetComponent,
  },
  {
    path: "event-player-list", component: EventPlayerListComponent,
  },
  {
    path: "dashboard", component: DashboardComponent,
  },
  {
    path: "tournament-page", component: TournamentPageComponent,
  },
  {
    path: "**", component: DashboardComponent,
  },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
