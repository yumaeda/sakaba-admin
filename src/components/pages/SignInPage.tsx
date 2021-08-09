/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Footer from '../Footer'
import { getCognitoUser } from '../../utils/CognitoUtility'
import { AuthenticationDetails, CognitoAccessToken } from 'amazon-cognito-identity-js'
import * as React from 'react'
import { Link } from 'react-router-dom'

const SignInPage: React.FC = () => {
    const [SignedIn, setSignedIn] = React.useState<boolean>(false)
    const [accessToken, setAccessToken] = React.useState<CognitoAccessToken>()
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
                    setAccessToken(result.getAccessToken())
                    setSignedIn(true)
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
                <h1 className="header-title">{`Sign In`}</h1>
            </header>
            <div>
            {
                SignedIn ? (
                    <div>
                        <label>User Name:</label>
                        <span>{userName}</span><br />
                        <Link to={'/signout'}>Sign Out</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>Username</label>
                        <input type="text" value={userName} onChange={handleUserNameChange} /><br />
                        <label>Password</label>
                        <input type="password" value={password} onChange={handlePasswordChange} />
                        <input type='submit' value="Sign In" />
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

export default SignInPage
