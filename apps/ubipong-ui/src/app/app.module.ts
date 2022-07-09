import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { AppRoutingModule } from './app-routing.module';
import { RoundRobinMatchSheetComponent } from './pages/round-robin-match-sheet/round-robin-match-sheet.component';
import { TournamentService } from './services/tournament.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { TournamentPageComponent } from './pages/tournament-page/tournament-page.component';
import { TournamentListComponent } from './components/tournament-list/tournament-list.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RoundRobinPageComponent } from './pages/round-robin-page/round-robin-page.component';
import { EventPlayerListComponent } from './components/event-player-list/event-player-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventEditorComponent } from './components/event-editor/event-editor.component';
import { EventPageComponent } from './pages/event-page/event-page.component';
import { SingleMatchSheetComponent } from './components/single-match-sheet/single-match-sheet.component';
import { SingleMatchSheetPageComponent } from './pages/single-match-sheet-page/single-match-sheet-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    RoundRobinMatchSheetComponent,
    TournamentPageComponent,
    TournamentListComponent,
    DashboardComponent,
    RoundRobinPageComponent,
    EventPlayerListComponent,
    EventListComponent,
    EventEditorComponent,
    EventPageComponent,
    SingleMatchSheetComponent,
    SingleMatchSheetPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    OAuthModule.forRoot({
      resourceServer: {
        sendAccessToken: true,
      },
    }),
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSnackBarModule,
    MatTableModule,
    MatToolbarModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatNativeDateModule,
  ],
  providers: [TournamentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
