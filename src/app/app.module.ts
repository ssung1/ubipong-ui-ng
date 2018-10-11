import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { RoundRobinGridComponent } from './components/round-robin-grid/round-robin-grid.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { TournamentService } from './services/tournament.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    RoundRobinGridComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    TournamentService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
