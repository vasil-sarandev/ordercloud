const request = require('request')
const util = require('util')
const requestPromise = util.promisify(request)

const superAdminRoleName = 'admin'

const superAdmin = async (req, res, next) => {
    try {

        var options = {
            method: 'POST',
            url: 'https://ordercloud.eu.auth0.com/oauth/token',
            headers: { 'content-type': 'application/json' },
            body: '{"client_id":"wLVJIXvnHlr0TQHRCSr4YizKvbSvbnMG","client_secret":"BsBTmgOK0yiqbWqVxeddE8Kj-E5BRzxSlEHO9m8FZ_LyXxhV3BjBg9YRujPa5Ujv","audience":"https://ordercloud.eu.auth0.com/api/v2/","grant_type":"client_credentials"}'
        }
        const tokenResp = await requestPromise(options)
        const token = JSON.parse(tokenResp.body).access_token

        const user_id = req.user.sub
        const rolesResponse = await requestPromise({
            url: `https://ordercloud.eu.auth0.com/api/v2/users/${user_id}/roles`,
            headers: {
                'Authorization': 'Bearer ' + token
            },
        })
        const roles = JSON.parse(rolesResponse.body)
        if (!roles.map(roles => roles.name).find(role => role === superAdminRoleName)) {
            throw new Error()
        }

        next()
    } catch (e) {
        console.log('error', e)
        res.status(401).send({ message: 'Unauthorized.' })
    }
}
module.exports = superAdmin

