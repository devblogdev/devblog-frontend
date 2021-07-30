// import axios from 'axios'
import auth from "../components/security/auth"

export function authentication() {
    const token = localStorage.getItem('token')
    return () => {
        if (token) {
            // console.log("Logged in worked")
            return auth.login()
        } else if (token === undefined) {
            // console.log("Logged out worked")
             return auth.logout()
        }
    }
    
}

// export default authentication

// const authorization= () => {
//     const token ="a"
//     if (token) {
//         return "Send API call to check user's credentials"
//     }
//     return auth.logout()
// }