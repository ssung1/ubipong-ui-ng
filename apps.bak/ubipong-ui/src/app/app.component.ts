import { Component, NgZone } from '@angular/core'
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'ubipong-ui-ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ubipong-ui';

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone,
  ) {
    // a bit of hack? here
    //
    // when the app is initiated, this gets called to navigate to
    // some default home page
    //
    // then when the app gets the callback, this gets called again
    this.userService.isLoggedIn().then(() => {
      // handle oauth redirect_uri callback
      //
      // we want to navigate only after logging in so that the page
      // contains the login information
      //
      // (also see app-routing.module)

      this.ngZone.run(() => router.navigate(['/']))
    })
  }
}
