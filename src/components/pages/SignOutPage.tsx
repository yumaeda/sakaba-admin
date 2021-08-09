/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import Footer from '../Footer'
import { getCognitoUser } from '../../utils/CognitoUtility'
import { CognitoUser } from 'amazon-cognito-identity-js'
import * as React from 'react'

interface Props {
    userName: string
    isSignedIn: boolean
}

const SignOutPage: React.FC<Props> = props => {
    const [message, setMessage] = React.useState('')
    const {userName, isSignedIn} = props

    React.useEffect(() => {
        if (isSignedIn) {
            const cognitoUser: CognitoUser = getCognitoUser(userName)
            cognitoUser.signOut(() => setMessage(`${userName} has signed out!!`))
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
