// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const oauthHost = 'https://dev-66577045.okta.com'

export const environment = {
  production: false,
  mockData: false,
  roundRobinGridRefresh: false,
  roundRobinGridRefreshInterval: 5000,
  tournamentServiceUrl: "http://localhost:8080",

  oauthIssuer: oauthHost,
  oauthAuthorizationEndpoint: `${oauthHost}/oauth2/v1/authorize`,
  oauthTokenEndpoint: `${oauthHost}/oauth2/v1/token`,
  oauthClientId: '0oa6wkbc4W96SCbyC5d6',
  oauthRequireHttps: false,
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
