import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

/**
 * more like a wrapper for OAuthService that can be disabled in dev
 * environment
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static TEST_USER_ID = 'testuser'

  /**
   * making it public here so we can turn off/on oauth for testing
   */
  public oauthEnabled: boolean

  constructor(
    private oauthService: OAuthService
  ) {
    this.oauthEnabled = environment.oauthEnabled
  }

  get isLoggedIn() {
    return this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()
  }

  login() {
    this.oauthService.initLoginFlow()
  }

  async getUserId() {
    if (!this.oauthEnabled) {
      return Promise.resolve(UserService.TEST_USER_ID)
    } else {
      if (!this.isLoggedIn) {
        await this.login()
      }
      return this.oauthService.getIdentityClaims()['email']
    }
  }

  async hasWriteAccess() {
    return Promise.resolve(true)
  }
}
