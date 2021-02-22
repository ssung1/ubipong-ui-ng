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
    // because we are using hash routing, we encouter two problems:
    //
    // 1. we cannot specify a page with a hash as redirect_url, so we need
    // to specify some dummy url as redirect_url and set a default routing
    // "**"
    //
    // 2. our app.component then serves as the callback handler
    //
    // 3. however, the way Angular does things, we end up routing to
    // our page before token can be retrieved by app.component
    //
    // 4. so, we need to disable navigation; instead, we let app.component
    // navigate to the default page after token is retrieved
    RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'disabled' })
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
