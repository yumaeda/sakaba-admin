import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js'
import * as React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { accessTokenKey, userNameKey } from '../utils/LocalStorageKeys'
import { getCurrentUser } from '../utils/CognitoUtility'

const PrivateRoute: React.VFC<RouteProps> = ({ children, ...rest }) => {
  const STATE_SIGNED_IN = 'signedIn'
  const STATE_LOADING = 'loading'
  const STATE_REDIRECT = 'redirect'
  const [state, setState] = React.useState<string>(STATE_LOADING)

  React.useEffect(() => {
    (async () => {
      const currentUser: CognitoUser | null = getCurrentUser()
      if (currentUser != null) {
        currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
          if (err == null && session != null) {
            const userName = localStorage.getItem(userNameKey)
            const accessToken = localStorage.getItem(accessTokenKey)
            const isValidUser = (
              userName === currentUser.getUsername()
              && accessToken === session.getAccessToken().getJwtToken()
            )
            if (isValidUser) {
              setState(STATE_SIGNED_IN)
            } else {
              setState(STATE_REDIRECT)
            }
          } else {
            setState(STATE_REDIRECT)
          }
        })
      } else {
        setState(STATE_REDIRECT)
      }
    })()
  }, [])

  if (state === STATE_LOADING) {
    return <div>Loading...</div>
  }

  return (
    <Route
      {...rest}
      render={({ location }) => ((state === STATE_SIGNED_IN)
        ? children
        : <Redirect to={{ pathname: '/signin', state: { from: location } }} />)}
    />
  )
}

export default PrivateRoute
