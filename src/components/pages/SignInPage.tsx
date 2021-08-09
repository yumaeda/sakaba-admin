/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Footer from '../Footer'
import { getCognitoUser } from '../../utils/CognitoUtility'
import { accessTokenKey, userNameKey } from '../../utils/LocalStorageKeys'
import { AuthenticationDetails } from 'amazon-cognito-identity-js'
import * as React from 'react'
import { useHistory } from 'react-router-dom'

const SignInPage: React.FC = () => {
    const history = useHistory()
    const { from } = { from: { pathname: '/' } }
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
                    localStorage.setItem(accessTokenKey, result.getAccessToken().getJwtToken())
                    localStorage.setItem(userNameKey, userName)
                    history.replace(from)
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
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" value={userName} onChange={handleUserNameChange} /><br />
                    <label>Password</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                    <input type='submit' value="Sign In" />
                </form>
            }
            </div> 
            <Footer />
        </>
    )
}

export default SignInPage
