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

  get userId() {
    if (!this.oauthEnabled) {
      return UserService.TEST_USER_ID
    } else {
      return this.oauthService.getIdentityClaims()['email']
    }
  }

  get hasWriteAccess() {
    return true
  }
}
