/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Footer from '../Footer'
import { getCognitoUser } from '../../utils/CognitoUtility'
import { userNameKey } from '../../utils/LocalStorageKeys'
import { CognitoUser } from 'amazon-cognito-identity-js'
import * as React from 'react'

const SignOutPage: React.FC = () => {
    const [message, setMessage] = React.useState('')

    React.useEffect(() => {
        const userName = localStorage.getItem(userNameKey)
        if (userName) {
            const cognitoUser: CognitoUser = getCognitoUser(userName)
            cognitoUser.signOut(() => setMessage(`${userName} has signed out!!`))
            localStorage.removeItem(userNameKey)
        } else {
            setMessage('User is not signed in!!')
        }
    }, [])

    return (
        <>
            <header className="header">
                <h1 className="header-title">{`Sign Out`}</h1>
            </header>
            <div>{message}</div>
            <Footer />
        </>
    )
}

export default SignOutPage
