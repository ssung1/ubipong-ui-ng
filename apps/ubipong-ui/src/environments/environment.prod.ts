const oauthHost = 'https://dev-66577045.okta.com'

export const environment = {
  production: true,
  mockData: false,
  roundRobinGridRefresh: true,
  roundRobinGridRefreshInterval: 15000,
  tournamentServiceUrl: "https://ubipong-api.herokuapp.com",

  oAuthIssuer: oauthHost,
  oAuthAuthorizationEndpoint: `${oauthHost}/oauth2/v1/authorize`,
  oAuthEndSessionEndpoint: `${oauthHost}/oauth2/v1/logout`,
  oAuthTokenEndpoint: `${oauthHost}/oauth2/v1/token`,
  oAuthClientId: '0oa6wkbc4W96SCbyC5d6',
  oAuthRequireHttps: false,
  oAuthEnabled: true,
};
