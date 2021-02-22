import { Component } from '@angular/core'
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
  ) {
    this.userService.isLoggedIn().then(() => {
      // handle oauth redirect_uri callback
    })
  }
}
