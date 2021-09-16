
import React, { useState } from 'react';
// MATERIAL UI DEPENDENCIES
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// APP DEPENDENCIES
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { createOrLoginUser } from '../../actions/userActions'
import DevBlogLogoWhiteColor from '../logo/DevBlogLogoWhiteColor';
import DevBlogLogoFrame from '../logo/DevBlogLogoFrame';
import { grey } from '@material-ui/core/colors'



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

// MATERIAL-UI STYLES
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// MAIN: FUCNTIONAL COMPONENT; RENDERS A LOGIN FORM
export default function Login(props) {

  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayErrors, setDisplayErrors] = useState(false)
  const dispatch = useDispatch()


  const fieldValidator = (field, fieldName) => {
    if (field.trim() === '') {
      return (
          <p className="errorField">{fieldName} can't be blank</p>
      )
    } 
    return null
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fieldValidator(email) || fieldValidator(password) ) {
      setDisplayErrors(true)
    } 
    else {
      const endpoint = "/api/v1/auth"
      const userData = {email, password}
      dispatch(createOrLoginUser(endpoint, userData, props))
      setEmail("")
      setPassword("")
      setDisplayErrors(false)
    }
  }
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <DevBlogLogoFrame
          child = { <DevBlogLogoWhiteColor /> }
          border = "solid 1px"
          backgroundMinor = { grey[500] }
          // backgroundMinor = { blueGrey[100] }
          // backgroundMinor = "whitesmoke"
          shape = "15px"
          height = "80px"
          width = "100px"
        />
        <Typography component="h1" variant="h5">
          DevBlog
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value ={email}
            onChange = { event => setEmail(event.target.value)}
          />
          {displayErrors && fieldValidator(email, "Email")}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value ={password}
            onChange = { event => setPassword(event.target.value)}
          />
          {displayErrors && fieldValidator(password, "Password")}
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              {/* <Link href="#" variant="body2">
                Forgot password?
              </Link> */}
            </Grid>
            <Grid item>
              <NavLink to="/signup" variant="body2">
              {"Don't have an account? Sign Up"}
              </NavLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}