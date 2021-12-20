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
      <Link color="inherit" href="https://devblog.dev">
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
export default function PasswordResetForm({email}) {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [displayErrors, setDisplayErrors] = useState(false)

  // CONSTANTS FOR INPUT CUSTOM HOOK
//   const { value: email, bind: bindEmail, reset: resetEmail } = useInput("")
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
      if (Object.values(errors).find( field => field !== null)) {
        setDisplayErrors(true)
      }
      else {
        const endpoint = "/password-reset/email" 
        const userData = { email, password}
        dispatch(createOrLoginUser(endpoint, userData, props ))
        resetPassword()
        resetPasswordConfirm()
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