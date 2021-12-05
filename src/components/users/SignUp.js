import React, { useState } from 'react';
// MATERIAL UI DEPENDENCIES
// import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
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
      <Link color="inherit" href="https://luisdevblog.netlify.app">
        DevBlog
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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

// MAIN FUNCTION; FUNCTIONAL COMPONENT
export default function SignUp(props) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [displayErrors, setDisplayErrors] = useState(false)

  // CONSTANTS FOR INPUT CUSTOM HOOK
  const { value: firstName, bind: bindFirstName, reset: resetFirstName } = useInput("")
  const { value: lastName, bind: bindLastName, reset: resetLastName } = useInput("")
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput("")


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
        setDisplayErrors(false)
      }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
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
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
              {/* <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              /> */}
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up 
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <NavLink to="/login" variant="body2">
                Already have an account? Log in
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}