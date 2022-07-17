// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// Cannot use https://dev-66577045.okta.com/oauth2 because that is only
// for authentication into Okta itself, not our application.  For our
// application, we must use our own authorization server
const oauthHost = '{authorization server}'

export const environment = {
  production: false,
  roundRobinGridRefresh: false,
  roundRobinGridRefreshInterval: 5000,
  tournamentServiceUrl: "http://localhost:8080",

  oAuthIssuer: oauthHost,
  oAuthAuthorizationEndpoint: `${oauthHost}/v1/authorize`,
  oAuthEndSessionEndpoint: `${oauthHost}/v1/logout`,
  oAuthTokenEndpoint: `${oauthHost}/v1/token`,
  oAuthClientId: '{client ID}',
  oAuthRequireHttps: false,
  oAuthEnabled: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
