import { Component } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { AuthConfig } from 'angular-oauth2-oidc/auth.config';
import { environment } from '../environments/environment'

@Component({
  selector: 'ubipong-ui-ng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ubipong-ui';

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
    
    issuer: environment.oauthIssuer,
    // if issuer in the response is different, set this to true
    skipIssuerCheck: false,
  
    // if using issuer does not work, set the authorization_endpoint here
    //
    // for SPAs, the only flow that makes sense is the authcode flow
  
    loginUrl: environment.oauthAuthorizationEndpoint,
    logoutUrl: environment.oauthEndSessionEndpoint,
  
    // URL of the SPA to redirect the user to after login
    redirectUri: window.location.origin + '/login/callback',
  
    // The SPA's id. The SPA is registered with this id at the auth-server
    // clientId: 'server.code',
    clientId: environment.oauthClientId,
  
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
    tokenEndpoint: environment.oauthTokenEndpoint,
  
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
    requireHttps: environment.oauthRequireHttps,
  };

  constructor(
    private oauthService: OAuthService
  ) {
    this.oauthService.configure(this.authCodeFlowConfig)
    this.oauthService.tryLogin().then(() => {
      const isLoggedIn = this.oauthService.hasValidAccessToken() && this.oauthService.hasValidIdToken()
      console.log(this.oauthService.getIdentityClaims())
      if (!isLoggedIn) {
        this.oauthService.initLoginFlow()
      }
    })
  }
}
