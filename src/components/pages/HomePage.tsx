/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Footer from '../Footer'
import * as React from 'react'
import { AuthenticationDetails, CognitoUserPool, CognitoUser } from 'amazon-cognito-identity-js'

const HomePage: React.FC = () => {
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
        const authenticationDetails = new AuthenticationDetails({
            Username: userName,
            Password: password
        })
        const userPool = new CognitoUserPool({
            UserPoolId : process.env.USER_POOL_ID ?? '',
            ClientId : process.env.CLIENT_ID ?? ''
        })
        const cognitoUser = new CognitoUser({
            Username: userName,
            Pool: userPool
        })

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
                alert('access token + ' + result.getAccessToken().getJwtToken())
                window.location.href = 'index.html'
            },
     
            onFailure: (err) => {
                console.dir(err)
                alert(JSON.stringify(err))
            }
        })
    }

    return (
        <>
            <header className="header">
                <h1 className="header-title">{`管理者ページ`}</h1>
            </header>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" value={userName} onChange={handleUserNameChange} /><br />
                    <label>Password</label>
                    <input type="text" value={password} onChange={handlePasswordChange} />
                    <input type='submit' value="ログイン" />
                </form>
            </div> 
            <Footer />
        </>
    )
}

export default HomePage
