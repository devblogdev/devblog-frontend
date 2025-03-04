import React, { useState } from 'react';
// MATERIAL UI DEPENDENCIES
// import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
// APP DEPENDENCIES
import { NavLink } from 'react-router-dom'
import { useInput } from '../hooks/input-hook'
import { createOrLoginUser } from '../../actions/userActions'
import { useDispatch } from 'react-redux'
import DevBlogLogoFrame from '../logo/DevBlogLogoFrame';
import DevBlogLogoWhiteColor from '../logo/DevBlogLogoWhiteColor';




// MATERIAL UI FUNCTION 
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://devblog.dev">
        DevBlog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

// MAIN FUNCTION; FUNCTIONAL COMPONENT
export default function SignUp(props) {
  const dispatch = useDispatch()
  const [displayErrors, setDisplayErrors] = useState(false)

  // CONSTANTS FOR INPUT CUSTOM HOOK
  const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput("")
  const { value: lastName, bind: bindLastName, reset: resetLastName } = useInput("")
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")
  const { value: passwordConfirm, bind: bindPasswordConfirm, reset: resetPasswordConfirm } = useInput("")


  const nameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === '') {
      return `${fieldName} is required`;
    }
    if (/[^a-zA-Z -]/.test(fieldValue)) {
      return 'Invalid characters';
    }
    return null;
  };

  const emailValidation = email => {
    if (
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email,
      )
    ) {
      return null;
    }
    if (email.trim() === '') {
      return 'Email is required';
    }
    return 'Please enter a valid email';
  };

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
      firstName: nameValidation("First name", firstName),
      lastName: nameValidation("Last name", lastName),
      email: emailValidation(email),
      password: passwordValidation(password)
  }
    
  const handleSubmit = (event) => {
      event.preventDefault();
      if (Object.values(errors).find( field => field !== null)) {
        setDisplayErrors(true)
      }
      else {
        const endpoint = "/users" 
        const userData = { first_name: firstName, last_name: lastName, email, password}
        dispatch(createOrLoginUser(endpoint, userData, props ))
        resetFirstName()
        resetLastName()
        resetEmail()
        resetPassword()
        resetPasswordConfirm()
        setDisplayErrors(false)
      }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        {/* <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <DevBlogLogoFrame 
          child= {<DevBlogLogoWhiteColor />}
          border = "solid 1px"
          backgroundMinor = "whitesmoke"
          shape = "15px"
          height = "80px"
          width = "100px"
        />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <FormStyled noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                {...bindFirstName}
              />
              <p className="errorField">{displayErrors && errors.firstName}</p>
            </Grid>
            
            {/* {typing} */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                {...bindLastName}
              />
              <p className="errorField">{displayErrors && errors.lastName}</p>
            </Grid>
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
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
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
                label="Password Confirmation"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                {...bindPasswordConfirm}
              />
            </Grid>
            <Grid item xs={12}>
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Submit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up 
          </Submit>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login" variant="body2">
                Already have an account? Log in
              </NavLink>
            </Grid>
          </Grid>
        </FormStyled>
      </Paper>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}