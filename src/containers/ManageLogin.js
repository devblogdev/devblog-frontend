
import { Route, Switch } from 'react-router-dom';
import Login from '../components/users/Login'
import Signup from '../components/users/SignUp'
import EmailConfirmation from '../components/users/EmailConfirmation'
// import PasswordReset from '../components/users/PasswordReset';
// import PasswordResetEmailForm from '../components/users/PasswordResetEmailForm';

// THe prpos here are the routerProps from the router in App.js
const ManageLogin = (props) => {
    return (
        <div>
            <Switch>
                <Route path="/signup" render = { () => <Signup {...props}/>} />

                <Route path="/login" render = { () => <Login {...props}/>} />
                
                <Route exact path="/registration-confirmation" render = { () => <EmailConfirmation {...props}/>} />
                <Route path="/registration-confirmation/:confirm_token" render = { () => <EmailConfirmation {...props}/>} />

                {/* <Route exact path="/password-reset" render = { () => <PasswordResetEmailForm {...props}/>} /> */}
                {/* <Route path="/password-reset/email" render = { () => <PasswordResetEmailForm {...props}/>} /> */}
                {/* <Route path="/password-reset/:confirm_token" render = { () => <PasswordReset {...props}/>} /> */}
            </Switch>
        </div>
    )
}

export default ManageLogin