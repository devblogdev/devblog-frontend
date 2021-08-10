import Login from '../components/users/Login'
import Signup from '../components/users/SignUp'

// THe prpos here are the routerProps from the router in App.js
const ManageLogin = (props) => {
    if (props.match.url === '/signup') {
        // The router props are being destructered here, passing a set of router key-value pairs to the child compoonent
        return <Signup {...props} />
    } else if (props.match.url === '/login') {
        return <Login {...props} />
    }
}

export default ManageLogin