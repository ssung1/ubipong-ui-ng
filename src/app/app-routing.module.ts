import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { RoundRobinGridComponent } from './components/round-robin-grid/round-robin-grid.component'

const routes: Routes = [
  {
    path: "rr", component: RoundRobinGridComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
