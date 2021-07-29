import axios from 'axios'
import auth from "../components/security/auth"


const authentication= () => {
    const token = "a"
    if (token === undefined) {
        auth.logout()
    }

}

const authorization= () => {
    const token ="a"
    if (token) {
        return "Send API call to check user's credentials"
    }
    return auth.logout()


}