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
import { DashboardComponent } from './pages/dashboard/dashboard.component'
import { RoundRobinPageComponent } from './pages/round-robin-page/round-robin-page.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatDatepickerModule} from '@angular/material/datepicker'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatTableModule } from '@angular/material/table'
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    RoundRobinMatchSheetComponent,
    TournamentPageComponent,
    TournamentListComponent,
    DashboardComponent,
    RoundRobinPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
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
  ],
  providers: [
    TournamentService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
