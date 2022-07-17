// Cannot use https://dev-66577045.okta.com/oauth2 because that is only
// for authentication into Okta itself, not our application.  For our
// application, we must use our own authorization server
const oauthHost = '{authorization server}'

export const environment = {
  production: true,
  roundRobinGridRefresh: true,
  roundRobinGridRefreshInterval: 15000,
  tournamentServiceUrl: "https://ubipong-api.herokuapp.com",

  oAuthIssuer: oauthHost,
  oAuthAuthorizationEndpoint: `${oauthHost}/v1/authorize`,
  oAuthEndSessionEndpoint: `${oauthHost}/v1/logout`,
  oAuthTokenEndpoint: `${oauthHost}/v1/token`,
  oAuthClientId: '{client ID}',
  oAuthRequireHttps: false,
  oAuthEnabled: true,
};
