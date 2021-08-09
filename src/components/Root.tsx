/**
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */
import HomePage from './pages/HomePage'
import SignInPage from './pages/SignInPage'
import SignOutPage from './pages/SignOutPage'
import * as React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const Root: React.FC<{}> = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route path="/signin" component={SignInPage} />
                <Route path="/signout" component={SignOutPage} />
                <HomePage />
            </Switch>
        </Router>
    )
}

export default Root
