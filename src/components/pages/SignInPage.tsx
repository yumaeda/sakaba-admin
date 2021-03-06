/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import { AuthenticationDetails } from 'amazon-cognito-identity-js'
import * as React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { accessTokenKey, idTokenKey, userNameKey } from '../../utils/LocalStorageKeys'
import { getCognitoUser } from '../../utils/CognitoUtility'

interface LocationState {
    from: { pathname: string }
}

const SignInPage: React.FC = () => {
  const [redirectToReferrer, setRedirectToReferrer] = React.useState<boolean>(false)
  const { state } = useLocation<LocationState>()
  const [userName, setUserName] = React.useState<string>('')
  const [password, setPassword] = React.useState<string>('')

  const handleUserNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    setUserName(event.currentTarget.value)
  }

  const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
    setPassword(event.currentTarget.value)
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    getCognitoUser(userName).authenticateUser(
      new AuthenticationDetails({ Username: userName, Password: password }),
      {
        onSuccess: (result) => {
          localStorage.setItem(idTokenKey, result.getIdToken().getJwtToken())
          localStorage.setItem(accessTokenKey, result.getAccessToken().getJwtToken())
          localStorage.setItem(userNameKey, userName)
          setRedirectToReferrer(true)
        },
        onFailure: (err) => {
          console.dir(err)
        }
      }
    )
  }

  if (redirectToReferrer === true) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <>
      <header className="header">
        <h1 className="header-title">Sign In</h1>
      </header>
      <div className="contents">
        <form onSubmit={handleSubmit}>
          <input className="input" type="text" value={userName} onChange={handleUserNameChange} placeholder="ログインID" />
          <br />
          <input className="input" type="password" value={password} onChange={handlePasswordChange} placeholder="パスワード" />
          <br />
          <input className="button" type="submit" value="サインイン" />
        </form>
      </div>
    </>
  )
}

export default SignInPage
