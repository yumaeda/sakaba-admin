import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'

const getCognitoUser = (Username: string): CognitoUser => {
    return new CognitoUser({
        Username,
        Pool: new CognitoUserPool({
            UserPoolId : process.env.USER_POOL_ID ?? '',
            ClientId : process.env.CLIENT_ID ?? ''
        })
    })
}

export { getCognitoUser }
