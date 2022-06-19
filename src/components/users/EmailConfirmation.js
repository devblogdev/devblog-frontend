import React, { useCallback, useEffect, useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import { ModalContext } from '../modal/ModalContext';
import { NavLink } from 'react-router-dom'

// This is a tricky component; if you get it wrong, you will have a infinte 'setInterval' running in the app or mutlitple setIntervals running
function EmailConfirmation() {

    const posts = useSelector((state) => state.posts.posts)
    const confirmationEmail = useSelector((state) => state.users.confirmation_email)
    const {retrieveModalState } = useContext(ModalContext)
    const dispatch = useDispatch()

    const history = useHistory();
    const params = useParams();

    const timerId = useRef(11)
    const [ counter, setCounter ] = useState(11);
    const [ message, setMessage ] = useState(<h3>Processing your email ...</h3>)


    
    const afterSignup = () => {
        // If user submits sign up form, the confirmationEmail variable will be set; if afterwards user refreshes the page, confirmationEmail wll be blank and hence the second return block will be rendered
        if(confirmationEmail) {
            return (
                <blockquote>
                    <br/><br/>
                    <strong>An email confirmation link has been sent to {confirmationEmail}.</strong><br/>
                    Please check your inbox to finish the registration process.<br/>
                    The link will expire after 15 minutes.
                </blockquote>
            )
        }
        return (
            <blockquote>
                <br/><br/>
                <strong>Please <NavLink to="/signup">sign up</NavLink> to confirm your email.</strong>
            </blockquote>
        )
    }

    const startCounter = useCallback(() => {
        if(timerId.current !== 11) {return;}
        timerId.current = 
            setInterval(function () {
                setCounter(c => c - 1)
            }, 1000);        
    },[])

    const redirectMessage = useCallback(() => {
        return (
            <blockquote>
                <br/><br/>
                <strong>Your email has been confirmed!!!</strong>  <br/>
                You will be redirected to the main page in {counter} seconds <br/>
            </blockquote>
        )
    },[counter])
    
    useEffect(() => {
        console.log(timerId.current)
        // Call the API (axios.post, below) only if the current url includes a relative path and counter is at 11 and the posts have been loaded
        // 'posts.length' is very important; the 'posts' state variable is the last one to be updated when refreshing the page; hence, if the 
        // below API call is made before the posts variable is updated, then the below call will run multiple times instead of one time
        if(Object.keys(params).length && counter > 10 && posts.length && timerId.current === 11) {
            axios.post(`/registration-confirmation/${params.confirm_token}`)
            .then( (response) => {
                localStorage.setItem('token', response.data.jwt)
                const payload = {
                    user: response.data.user,
                    sessionToken: {
                        token: response.data.jwt,
                        exp: response.data.exp
                    }
                }
                // dispatch({type: 'SET_USER', payload: response.data.user })
                dispatch({type: 'SET_USER', payload: payload })
                dispatch({type: 'CLEAR_CONFIRMATION_EMAIL' })
                startCounter();
            })
            .catch(error => {
                console.log(error)
                setMessage(
                    <blockquote>
                        <br/><br/>
                        <p>Sorry, the email address could not be confirmed or the email confirmation link has expired. Please try <NavLink to="/signup">registering</NavLink> again.</p>
                        <p>Error: {error.response.status} {error.response.statusText}</p>
                    </blockquote>
                ) 
            })
        }
        
        if(counter < 11) setMessage( () => redirectMessage())
        return function cleanup(){ 
            if(counter < 3) {
                clearInterval(timerId.current)
                setTimeout(() => {
                    history.push("/")
                    retrieveModalState(["You have been successfully logged in"])
                },2000)
            }
        }
    },[params, counter, startCounter, history, redirectMessage, posts.length, dispatch, retrieveModalState])

    
    return(
        <div>
            {/* If the current url is "registration-confirmation" (no relative path), display a confirmation link message; if the user refreshes the page, remove the confirmation message and ask user to sign up instead */}
            {Object.keys(params).length === 0 ? (
                <React.Fragment>
                    {afterSignup()}
                </React.Fragment>
            ) : (
                // If the current url includes a relative path: "registration-confirmation/somepath", display sucess message or error message depending on API call response from useEffect hook
                <React.Fragment>
                    {message}
                </React.Fragment>
            )}
        </div>
    )
}

export default EmailConfirmation