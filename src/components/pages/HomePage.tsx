/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Footer from '../Footer'
import { getCognitoUser } from '../../utils/CognitoUtility'
import { AuthenticationDetails, CognitoUser, CognitoAccessToken } from 'amazon-cognito-identity-js'
import * as React from 'react'

const HomePage: React.FC = () => {
    const [loggedIn, setLoggedIn] = React.useState<boolean>(false)
    const [accessToken, setAccessToken] = React.useState<CognitoAccessToken>()
    const [userName, setUserName] = React.useState<string>('')
    const [password, setPassword] = React.useState<string>('')

    const handleUserNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setUserName(event.currentTarget.value)
    }

    const handlePasswordChange = (event: React.FormEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
    }

    const handleLogout = (event: React.MouseEvent<HTMLInputElement>) => {
        event.preventDefault()
        const cognitoUser: CognitoUser = getCognitoUser(userName)
        cognitoUser.signOut(() => {
            setLoggedIn(false)
            setAccessToken(cognitoUser.getSignInUserSession()?.getAccessToken())
            setPassword('')
        })
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        getCognitoUser(userName).authenticateUser(
            new AuthenticationDetails({ Username: userName, Password: password }),
            {
                onSuccess: (result) => {
                    setAccessToken(result.getAccessToken())
                    setLoggedIn(true)
                },
                onFailure: (err) => {
                    console.dir(err)
                }
            }
        )
    }

    return (
        <>
            <header className="header">
                <h1 className="header-title">{`管理者ページ`}</h1>
            </header>
            <div>
            {
                loggedIn ? (
                    <div>
                        <label>User Name:</label>
                        <span>{userName}</span><br />
                        <input type="button" value="ログアウト" onClick={handleLogout} />
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type="text" value={userName} onChange={handleUserNameChange} /><br />
                        <label>Password</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                        <input type='submit' value="ログイン" />
                    </form>
                )
            }
            </div> 
            <div>
                <label>JWT Token:</label>
                <p>{accessToken?.getJwtToken()}</p>
            </div>
            <Footer />
        </>
    )
}

export default HomePage
