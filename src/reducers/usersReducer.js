import auth from "../components/security/auth";

export default function usersReducer(
    state = {
        users: [],
        current_user: {}
    }, action) {
    switch(action.type) {
        case 'SET_USER':
            auth.login();
            return {...state, current_user: action.user }
        case 'LOGOUT_USER':
            auth.logout();
            return {...state, current_user: {}}
        default:
            return state
    }
} 
