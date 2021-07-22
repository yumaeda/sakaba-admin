const { Authenticator } = require('cognito-at-edge')

const authenticator = new Authenticator({
    region: 'ap-northeast-1',
    userPoolId: 'DUMMY',
    userPoolAppId: 'DUMMY',
    userPoolDomain: 'DUMMY'
})

exports.handler = async (request) => authenticator.handle(request)
