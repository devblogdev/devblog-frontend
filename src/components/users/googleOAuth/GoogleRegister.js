import axios from 'axios';
import React, { useEffect } from 'react'
// THIS COMPONENT IS NOT USED IN THE APP; RESERVE FOR FUTURE USE
const GoogleRegister = function RegisterContent() {

    function handleResponse(response) {
        // Save user to redux store and all the tokens to cookies
    }

   // callback
   function signInCallback(authResult) {
       if (authResult.code) {
           const params = { code: authResult.code }
           const path = "localhost:3000/api/users/auth/google_oauth2/callback";
           // This just handdles posting with axios 
        //    postResource(path, params, handleResponse);
           axios.post(path, params, handleResponse)
            .then( resp => {
                console.log(resp)
            }).catch ( error => {
                console.log(error)
            })
       }
   }

   // This will prompt opening the google window and returns a callback upon success
   const googleHandler = () => {
       googleAuth.grantOfflineAccess().then(signInCallback);
   };

   useEffect(() => {
       // Initialize the GoogleAuth object
       gapi.load("auth2", function foo() {
           const auth = gapi.auth2.init({
               client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
               scope: "email profile",
           });
           setGoogleAuth(auth);
           console.log("Init");
       });
   }, []);

   return (
       <Button onclick={googleHandler}>
           Continue with Google
       </Button>
   );

}

export default GoogleRegister;

// Open a new window
// const openWindow = () => {
//     const result = window.open('http://localhost:3000/static?s=100&p[title]=Fb Share&p[summary]=Facebook share popup&p[url]=javascript:fbShare("http://jsfiddle.net/stichoza/EYxTJ/")&p[images][0]="http://goo.gl/dS52U"', 'sharer', 'toolbar=0,status=0,width=548,height=325')
//   }