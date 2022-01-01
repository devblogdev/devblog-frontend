import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import PasswordResetEmailForm from './PasswordResetEmailForm';
import PasswordResetForm from './PasswordResetForm';
import axios from 'axios';


function PasswordReset() {
    const params = useParams()
    const [message, setMessage] = useState();
    const [tempEmail, setTempEmail] = useState();

    const updateMessage = (argument) => {
        setMessage(argument)
    }

    useEffect(() => {
        if(params.confirm_token){
            axios.post(`/password-reset/${params.confirm_token}`)
                .then((response) => {
                    setTempEmail(response.data.email)
                })
                .catch(error => {
                    setMessage (
                        <blockquote>
                            <br/><br/>
                            <strong>
                                This link is no longer active for password reset. Go to <NavLink to="/login">login</NavLink>.
                            </strong> 
                            <p>Error: {error.response.status} {error.response.statusText}</p>
                        </blockquote>
                    )
                })
        }
    }, [params.confirm_token]);

    if(tempEmail && message) {    // If the user submits the password reset form and response is successful, replace the form with the success message
        return (
            <React.Fragment>
                {message}
            </React.Fragment>
        )
    }
    else if(tempEmail) {     // If the user is in '/password-reset/confirm_token' path and an email was recieved from the API, display the reset password form
        return (
            <React.Fragment>
                <PasswordResetForm updateMessage= {updateMessage} email = {tempEmail}/>
            </React.Fragment>
        )
    }
    else if(!message && !params.confirm_token) {     // If the user is in the '/password-reset' path and the message has not been set, display the password reset email form
        return (
            <React.Fragment>
                <PasswordResetEmailForm updateMessage= {updateMessage} />
            </React.Fragment>
        )
    }
    else {          // If the user is in the '/password-reset' path and the message has been set, replace the password reset email form with the message;
        return(     // the message can be a success message or an error message
            <React.Fragment>
                {message}
            </React.Fragment>
        )
    }
}

export default PasswordReset
