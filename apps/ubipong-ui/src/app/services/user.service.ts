import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

/**
 * more like a wrapper for OAuthService that can be disabled in dev environment
 *
 * the entire flow (oauth enabled in prod/qa) looks like this
 *
 *                 .getUserId(): we want to get user id
 *
 *                                  |
 *                                  |
 *                                  v
 *
 *                 .isLoggedIn(): check to see if we already have user id
 *
 *                                  |
 *                                  |
 *               ,------------------{
 *               |                  |
 *               |                  |
 *
 *          have user             do not have user
 *
 *               |                  |
 *               |                  |
 *               v                  v
 *
 *        return user id          .oauthService.tryLogin() try to exchange authcode for user id
 *
 *                                  |
 *                                  |
 *                                  v
 *
 *                                .isLoggedIn() need to check to see if .tryLogin() worked
 *
 *                                  |
 *                                  |
 *                                  }-------------------------------------------.
 *                                  |                                           |
 *                                  |                                           |
 *
 *                          .tryLogin() worked                           .tryLogin() did not work
 *                          have user                                    do not have user
 *
 *                                  |                                           |
 *                                  |                                           |
 *                                  v                                           v
 *
 *                          return user id                               return error
 *
 *                          
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  public static TEST_USER_ID = 'testuser'

  readonly authCodeFlowConfig: AuthConfig = {
    // Url of the Identity Provider
    //
    // angular-oauth2-odic will try to call ${issuer}/.well-known/openid-configuration
    //
    // if the issuer of the returned value from .../openid-configuration does not match
    // the issuer specified here, then angular-oauth2-odic will refuse to accept the
    // configuration, unless skipIssuerCheck is true
    //
    // often using issuer will not work because the .../openid-configuration has a blocks
    // CORS requests.
    
    issuer: environment.oAuthIssuer,
    // if issuer in the response is different, set this to true
    skipIssuerCheck: false,
  
    // if using issuer does not work, set the authorization_endpoint here
    //
    // for SPAs, the only flow that makes sense is the authcode flow
  
    loginUrl: environment.oAuthAuthorizationEndpoint,
    logoutUrl: environment.oAuthEndSessionEndpoint,
  
    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/login/callback',
  
    // The SPA's id. The SPA is registered with this id at the auth-server
    // clientId: 'server.code',
    clientId: environment.oAuthClientId,
  
    // Just needed if your auth server demands a secret. In general, this
    // is a sign that the auth server is not configured with SPAs in mind
    // and it might not enforce further best practices vital for security
    // such applications.
    // dummyClientSecret: 'secret',
  
    // needs to be 'code' for authcode flow.  angular-oauth2-oidc uses this
    // to determine if the flow is authcode or implicit
    responseType: 'code',
  
    // this is used to exchange an authcode for an access token
    //
    // this part usually fails because authorization server blocks CORS
    tokenEndpoint: environment.oAuthTokenEndpoint,
  
    // set the scope for the permissions the client should request
    // The first four are defined by OIDC.
    // Important: Request offline_access to get a refresh token
    // The api scope is a usecase specific one
    // scope: 'openid profile email offline_access api',
    scope: 'openid profile email',
  
    showDebugInformation: true,
  
    // if endpoints from the discovery endpoint have different host, then
    // set this to false
    strictDiscoveryDocumentValidation: false,
  
    // for non-prod, if we don't want to use https, set this to false
    requireHttps: environment.oAuthRequireHttps,
  }

  /**
   * making it public here so we can turn off/on oauth for testing
   */
  public oAuthEnabled: boolean

  constructor(
    private oAuthService: OAuthService
  ) {
    this.oAuthEnabled = environment.oAuthEnabled
    this.oAuthService.configure(this.authCodeFlowConfig)
  }

  get hasToken() {
    return this.oAuthService.hasValidAccessToken() && this.oAuthService.hasValidIdToken()
  }

  /**
   * user is logged in if either
   * 1. we already have a valid token, or
   * 2. we have an authcode to exchange for a valid token
   */
  async isLoggedIn() {
    if (!this.oAuthEnabled) {
      return true
    }

    if (this.hasToken) {
      return true
    }

    await this.oAuthService.tryLogin()

    return this.hasToken
  }

  async login() {
    // calls token endpoint (only works if we have authcode)
    //
    // this call succeeds as long as call was complete, even if we did not have authcode
    //
    // if we fail here (due to incorrect configuration or network error), an error is thrown
    await this.oAuthService.tryLogin()

    // if we are called back from authorization_endpoint (meaning we have authcode),
    // then then above should get token successfully
    //
    // to test that, we get this.isLoggedIn
    if (!(await this.isLoggedIn())) {
      // if we are not called back from authorization_endpoint, then we have to redirect to authorization_endpoint
      // and since we redirect, there's no awaiting on this...we pretty much quit the app
      this.oAuthService.initLoginFlow()
    }
  }

  async getUserId() {
    if (!this.oAuthEnabled) {
      return UserService.TEST_USER_ID
    }

    if (await this.isLoggedIn()) {
      return this.oAuthService.getIdentityClaims()['email']
    } else {
      throw new Error('User is not logged in.')
    }
  }

  async hasWriteAccess() {
    return this.isLoggedIn()
  }
}
