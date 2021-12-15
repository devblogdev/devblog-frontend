
import { Route, Switch } from 'react-router-dom';
import Login from '../components/users/Login'
import Signup from '../components/users/SignUp'
import EmailConfirmation from '../components/users/EmailConfirmation'

// THe prpos here are the routerProps from the router in App.js
const ManageLogin = (props) => {
    return (
        <div>
            <Switch>
            <Route path="/signup" render = { () => <Signup {...props}/>} />
    {/* console.log(props.match) */}
    {/* if (props.match.url === '/signup') { */}
        {/* // The router props are being destructered here, passing a set of router key-value pairs to the child compoonent */}
        {/* return <Signup {...props} /> */}

    {/* // }  */}
    {/* else if (props.match.url === '/login') { */}
        {/* return <Login {...props} /> */}
        <Route path="/login" render = { () => <Login {...props}/>} />
        
        
    {/* }  */}
    {/* else if (props.match.path === "/email-confirmation/:confirmatino_token") { */}
        {/* return <EmailConfirmation /> */}
        <Route exact path="/registration-confirmation" render = { () => <EmailConfirmation {...props}/>} />
        <Route path="/registration-confirmation/:relative" render = { () => <EmailConfirmation {...props}/>} />
        
    {/* } */}
        </Switch>
        </div>
    )
}

export default ManageLogin