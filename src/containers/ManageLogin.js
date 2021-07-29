import Login from '../components/users/Login'

const ManageLogin = (props) => {
    if (props.match.url === '/login') {
        return <Login />
    } 
    return <Login />
}

export default ManageLogin