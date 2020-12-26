import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { MainMenuComponent } from './components/main-menu/main-menu.component'
import { AppRoutingModule } from './app-routing.module'
import { RoundRobinMatchSheetComponent } from './pages/round-robin-match-sheet/round-robin-match-sheet.component'
import { TournamentService } from './services/tournament.service'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component'
import { TournamentListComponent } from './components/tournament-list/tournament-list.component'

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    RoundRobinMatchSheetComponent,
    TournamentPageComponent,
    TournamentListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    TournamentService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
