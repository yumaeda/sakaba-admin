import { getCurrentUser } from '../utils/CognitoUtility'
import { userNameKey } from '../utils/LocalStorageKeys'
import * as React from 'react'
import { Redirect, Route } from 'react-router-dom'

interface Props {
    children: React.ReactNode
    path: string
}

const PrivateRoute: React.FC<Props> = props => {
    const {children, path} = props
    return (
        <Route
            path={path}
            render={ ({ location }) => {
                const userName = localStorage.getItem(userNameKey)
                const isSignedIn = (userName === getCurrentUser()?.getUsername())
                return isSignedIn ?
                    children :
                    <Redirect to={{ pathname: '/signin', state: { from: location } }} />
        }} />
    )
}

export default PrivateRoute
