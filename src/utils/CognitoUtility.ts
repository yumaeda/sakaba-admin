import { CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'

const getUserPool = (): CognitoUserPool => {
    return new CognitoUserPool({
        UserPoolId : process.env.USER_POOL_ID ?? '',
        ClientId : process.env.CLIENT_ID ?? ''
    })
}

const getCognitoUser = (Username: string): CognitoUser => {
    return new CognitoUser({
        Username,
        Pool: getUserPool()
    })
}

const getCurrentUser = (): CognitoUser | null => {
    return getUserPool().getCurrentUser()
}

export { getCognitoUser, getCurrentUser }
