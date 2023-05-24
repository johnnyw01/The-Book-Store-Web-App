export const oktaConfig = {
    clientId: '0oa9p03ty55BGLu1i5d7',
    issuer: 'https://dev-12804629.okta.com/oauth2/default',
    redirectURI: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile','email'],
    pkce: true,
    disableHttpsCheck: true
}

//Will have all the information needed to work with the third party service in Okta and to route the React app to the exact service in Okta