import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js'

const getUserPool = (): CognitoUserPool => new CognitoUserPool({
  UserPoolId: process.env.USER_POOL_ID ?? '',
  ClientId: process.env.CLIENT_ID ?? ''
})

const getCognitoUser = (Username: string): CognitoUser => new CognitoUser({
  Username,
  Pool: getUserPool()
})

const getCurrentUser = (): CognitoUser | null => getUserPool().getCurrentUser()

export { getCognitoUser, getCurrentUser }
