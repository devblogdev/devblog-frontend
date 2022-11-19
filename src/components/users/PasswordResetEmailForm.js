import React, { useState } from 'react';
// MATERIAL UI DEPENDENCIES
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// APP DEPENDENCIES
import { NavLink } from 'react-router-dom'
import { useInput } from '../hooks/input-hook'
import DevBlogLogoFrame from '../logo/DevBlogLogoFrame';
import DevBlogLogoWhiteColor from '../logo/DevBlogLogoWhiteColor';
import axios from 'axios'


// MATERIAL UI STYLES
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// Sends link to reset password
export default function PasswordResetEmailForm(props) {
  const classes = useStyles();
  const [displayErrors, setDisplayErrors] = useState(false)
  
  // CONSTANTS FOR INPUT CUSTOM HOOK
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
  
  const emailValidation = email => {
    if (/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email,)) {
      return null;
    }
    if (email.trim() === '') {
      return 'Email is required';
    }
    return 'Please enter a valid email';
  };

  const errors = {
      email: emailValidation(email),
  }
    
  const handleSubmit = (event) => {
      event.preventDefault();
      if (errors.email) {
        setDisplayErrors(true)
      }
      else {
        const endpoint = "/password-reset" 
        // "email" is the email written by the user in the form
        axios.post(endpoint, { email }) 
            .then((response) => {
                props.updateMessage(
                    <blockquote>
                        <br/><br/>
                        <strong>A password reset link has been sent to {email}.</strong><br/> 
                        Please check your inbox.<br/> 
                        The link will expire after 10 minutes.
                    </blockquote>
                )
            })
            .catch(error => {
                console.log(error)
                props.updateMessage(
                    <blockquote>
                        <br/><br/>
                        <strong>
                            The provided email has not been registered at DevBlog or 
                            the email was registered using a third party provider (such as Google), in which case no password reset is needed. 
                            Go to <NavLink to="/login">login</NavLink>.
                        </strong>
                            <p>Error: {error.response.status} {error.response.statusText}</p>
                    </blockquote>
                )
            })
        resetEmail()
        setDisplayErrors(false)
      }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <DevBlogLogoFrame 
          child= {<DevBlogLogoWhiteColor />}
          border = "solid 1px"
          backgroundMinor = "whitesmoke"
          shape = "15px"
          height = "80px"
          width = "100px"
        />  
        Write your email address below to reset your password:
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                {...bindEmail}
              />
             <p className="errorField">{displayErrors && errors.email}</p>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Send Password Reset Link
          </Button>
        </form>
      </div>
    </Container>
  );

}


    