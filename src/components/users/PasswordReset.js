import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
// import { ModalContext } from '../modal/ModalContext';
import PasswordResetEmailForm from './PasswordResetEmailForm';

function PasswordReset() {

    // const posts = useSelector((state) => state.posts.posts)
    const confirmationEmail = useSelector((state) => state.users.confirmation_email)
    // const {retrieveModalState } = useContext(ModalContext)

    // const history = useHistory();
    const params = useParams();
        
    if(Object.keys(params).length === 0) {
        return (
            <div><PasswordResetEmailForm /></div>
        )
    } else if(confirmationEmail.length) {
        return(
            <blockquote>
            <br/>
            <br/>
            <strong>A password reset link has been sent to {confirmationEmail}</strong> 
        </blockquote>
        )
    }
}

export default PasswordReset