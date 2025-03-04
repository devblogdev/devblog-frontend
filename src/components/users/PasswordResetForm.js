import React, { useState } from 'react';
// MATERIAL UI DEPENDENCIES
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
// APP DEPENDENCIES
import { useInput } from '../hooks/input-hook'
import DevBlogLogoFrame from '../logo/DevBlogLogoFrame';
import DevBlogLogoWhiteColor from '../logo/DevBlogLogoWhiteColor';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


// MATERIAL UI STYLES
const Paper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(5),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',  
}))

const FormStyled = styled('form')(({ theme }) => ({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(3),
}))

const Submit = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}))

// Resets the password
export default function PasswordResetForm({updateMessage, email}) {

  const [displayErrors, setDisplayErrors] = useState(false)

  // CONSTANTS FOR INPUT CUSTOM HOOK
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")
  const { value: passwordConfirm, bind: bindPasswordConfirm, reset: resetPasswordConfirm } = useInput("")

  const passwordValidation = (password) => {
    if (password.trim() === '') {
      return `Password is required`;
    }
    if (password.trim().length < 5) {
      return `Password needs to be at least five characters`;
    }
    if (password !== passwordConfirm) {
      return "Password and Password confirmation must match"
    }
    return null;
  };

  const errors = {
      password: passwordValidation(password)
  }
    
  const handleSubmit = (event) => {
      event.preventDefault();
      if (errors.password) {
        setDisplayErrors(true)
      }
      else {
        const endpoint = "/reset-password"
        axios.post(endpoint, { password, email })
            .then((response) => {
                updateMessage(
                    <blockquote>
                        <br/><br/>
                        <strong>Your password has been successfully reset. Go to <NavLink to="/login"> login.</NavLink></strong>  
                    </blockquote>
                )
            })
            .catch(error => {
                console.log(error)
                updateMessage(
                    <blockquote>
                        <br/><br/>
                        <strong>There was an error resetting your password. Please try the process again.</strong>  
                    </blockquote>
                )
            })
        resetPassword()
        resetPasswordConfirm()
        setDisplayErrors(false)
      }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <DevBlogLogoFrame 
          child= {<DevBlogLogoWhiteColor />}
          border = "solid 1px"
          backgroundMinor = "whitesmoke"
          shape = "15px"
          height = "80px"
          width = "100px"
        />
        Write your new password:
        <FormStyled noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="New password"
                type="password"
                id="password"
                autoComplete="current-password"
                {...bindPassword}
              />
              <p className="errorField">{displayErrors && errors.password}</p>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="passwordConfrm"
                label="New password confirmation"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                {...bindPasswordConfirm}
              />
            </Grid>
          </Grid>
          <Submit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Reset Password
          </Submit>
        </FormStyled>
      </Paper>
    </Container>
  );
}