import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { RoundRobinGridComponent } from './components/round-robin-grid/round-robin-grid.component'
import { MainMenuComponent } from './components/main-menu/main-menu.component';

const routes: Routes = [
  {
    path: "rr", component: RoundRobinGridComponent,
  },
  {
    path: "", component: MainMenuComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
