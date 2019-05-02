import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { RoundRobinGridComponent } from './components/round-robin-grid/round-robin-grid.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TournamentService } from './services/tournament.service';
import { HttpClientModule } from '@angular/common/http';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RoundRobinMatchSheetComponent } from './components/round-robin-match-sheet/round-robin-match-sheet.component';
import { EventPlayerListComponent } from './components/event-player-list/event-player-list.component';
import { FormsModule } from '@angular/forms';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';

@NgModule({
  declarations: [
    AppComponent,
    RoundRobinGridComponent,
    MainMenuComponent,
    RoundRobinMatchSheetComponent,
    EventPlayerListComponent,
    TournamentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    TournamentService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
