const jwt = require('express-jwt')
// const jwtAuthz = require('express-jwt-authz')
const jwksRsa = require('jwks-rsa')


// eslint-disable-next-line no-undef
const API_URL = process.env.API_URL


const auth = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 20,
        jwksUri: 'https://ordercloud.eu.auth0.com/.well-known/jwks.json'
    }),

    // Validate the audience and the issuer.
    aud: API_URL,
    issuer: ['https://ordercloud.eu.auth0.com/'],
    algorithms: ['RS256']
})

module.exports = auth