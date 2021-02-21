import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  loggedIn = false
  userId = ''

  constructor(
    private breakpointObserver: BreakpointObserver,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.refreshUser()
  }

  refreshUser() {
    this.userService.isLoggedIn().then((loggedIn) => {
      this.loggedIn = loggedIn
      if (this.loggedIn) {
        this.userService.getUserId().then((userId) => {
          this.userId = userId
        })
      }
    })
  }

  login() {
    this.userService.login().then(() => {
      this.refreshUser()
    })
  }
}
