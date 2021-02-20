const oauthHost = 'https://dev-66577045.okta.com'

export const environment = {
  production: true,
  mockData: false,
  roundRobinGridRefresh: true,
  roundRobinGridRefreshInterval: 15000,
  tournamentServiceUrl: "https://ubipong-api.herokuapp.com",

  oauthIssuer: oauthHost,
  oauthAuthorizationEndpoint: `${oauthHost}/oauth2/v1/authorize`,
  oauthTokenEndpoint: `${oauthHost}/oauth2/v1/token`,
  oauthClientId: '0oa6wkbc4W96SCbyC5d6',
  oauthRequireHttps: false,
};
