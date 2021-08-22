/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import PrivateRoute from './PrivateRoute'
import HomePage from './pages/HomePage'
import MenuEditPage from './pages/MenuEditPage'
import SignInPage from './pages/SignInPage'
import SignOutPage from './pages/SignOutPage'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


const Root: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route path="/signin" component={SignInPage} />
                <Route path="/signout" component={SignOutPage} />
                <PrivateRoute path="/menu-edit">
                    <MenuEditPage />
                </PrivateRoute>
                <PrivateRoute path="/">
                    <HomePage />
                </PrivateRoute>
            </Switch>
        </Router>
    )
}

export default Root
