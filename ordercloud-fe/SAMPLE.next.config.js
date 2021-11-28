const env = process.env.NODE_ENV || 'development'

const config = {
  development: {
    api_url: 'http://localhost:3005',
    baseurl_app: 'http://localhost:3000',
    auth0_domain: 'auth0_domain',
    auth0_clientId: 'auth0_clientId',
    auth0_redirectUri: 'auth0_redirectUri',
    auth0_audience: 'auth0_audience',
    auth0_scope: 'read:current_user read:roles'
  },
  production: {
    api_url: 'https://ordercloud-be.herokuapp.com',
    baseurl_app: 'https://ordercloud.bg',
    auth0_domain: 'auth0_domain',
    auth0_clientId: 'auth0_clientId',
    auth0_redirectUri: 'auth0_redirectUri',
    auth0_audience: 'auth0_audience',
    auth0_scope: 'read:current_user read:roles'
  }
}[env]

module.exports = {
  env: {
    contentful_space_id: 'contentful_space_id',
    contentful_api_key: 'contentful_api_key',
    mailchimp_api_key: 'mailchimp_api_key',
    mailchimp_server: 'us2',
    mailchimp_list_id: 'mailchimp_list_id',
    logo_url: 'https://ordercloud.s3.eu-central-1.amazonaws.com/assets/logo.png',
    sendgrid_api_key: 'sendgrid_api_key',
    ...config
  },
  images: {
    domains: [
      'static.takeaway.com',
      'i.imgur.com',
      'ordercloud.s3.eu-central-1.amazonaws.com',
      'ordercloud.s3.amazonaws.com'
    ]
  },
  typescript: {
    // ignoreBuildErrors: true
  }
}
