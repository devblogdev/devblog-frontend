import Login from '../components/users/Login'
import Signup from '../components/users/SignUp'

const ManageLogin = (props) => {
    if (props.match.url === '/signup') {
        return <Signup />
    } else if (props.match.url === '/login') {
        return <Login />
    }
}

export default ManageLogin