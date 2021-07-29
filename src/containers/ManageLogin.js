import Login from '../components/users/Login'
import Signup from '../components/users/Signup'

const ManageLogin = (props) => {
    if (props.match.url === '/signup') {
        return <Signup />
    } 
    return <Login />
}

export default ManageLogin