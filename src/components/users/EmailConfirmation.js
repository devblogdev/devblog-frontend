import React, { useCallback, useEffect, useState, useRef, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios';
import { ModalContext } from '../modal/ModalContext';

// This is a tricky component; if you get it wrong, you will have a infinte 'setInterval' running in the app or mutlitple setIntervals running
function EmailConfirmation() {

    const posts = useSelector((state) => state.posts.posts)
    const confirmationText = useSelector((state) => state.users.confirmation_text)
    const {retrieveModalState } = useContext(ModalContext)
    const dispatch = useDispatch()

    const history = useHistory();
    const params = useParams();

    const timerId = useRef(11)
    const [ counter, setCounter ] = useState(11);
    const [ message, setMessage ] = useState(<h3>Processing your email ...</h3>)


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
                <br/>
                <br/>
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
            console.log("in API")
            axios.post(`/registration-confirmation/${params.relative}`)
            .then( (response) => {
                console.log(response)
                localStorage.setItem('token', response.data.jwt)
                dispatch({type: 'SET_USER', payload: response.data.user })
                startCounter();
            })
            .catch(error => {
                console.log(error)
                setMessage(() => <p><br/><br/>Sorry, the email address could not be confirmed. Please try registering again.</p>)
            })
        }
        
        if(counter < 11) setMessage( () => redirectMessage())
        return function cleanup(){ 
            if(counter < 2) {
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
            {Object.keys(params).length === 0 ? (
                <blockquote>
                    <br/>
                    <br/>
                    <strong>An email confirmation link has been sent to {confirmationText}</strong>.<br/>
                    Please check your inbox to finish the registration process.<br/>
                    The link will expire after 10 minutes.
                </blockquote>
            ) : (
                <React.Fragment>
                    {message}
                </React.Fragment>
            )}
        </div>
    )
}

export default EmailConfirmation