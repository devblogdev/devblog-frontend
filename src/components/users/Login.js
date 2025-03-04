import React, { useState, useContext } from "react";
// MATERIAL UI DEPENDENCIES
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
// APP DEPENDENCIES
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrLoginUser } from "../../actions/userActions";
import DevBlogLogoWhiteColor from "../logo/DevBlogLogoWhiteColor";
import DevBlogLogoFrame from "../logo/DevBlogLogoFrame";
import { grey } from "@mui/material/colors";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { ModalContext } from "../modal/ModalContext";

// MATERIAL UI FUNCTION
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://devblog.dev">
        DevBlog
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// MATERIAL-UI STYLES
const Paper = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(5),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

const FormStyled = styled('form')(({ theme}) => ({
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(1),
}))

const Submit = styled(Button)(({ theme}) => ({
  margin: theme.spacing(3, 0, 2),
}))

// MAIN: FUCNTIONAL COMPONENT; RENDERS A LOGIN FORM
export default function Login(props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayErrors, setDisplayErrors] = useState(false);
  const dispatch = useDispatch();

  const { retrieveModalState } = useContext(ModalContext);

  const fieldValidator = (field, fieldName) => {
    if (field.trim() === "") {
      return <p className="errorField">{fieldName} can't be blank</p>;
    }
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (fieldValidator(email) || fieldValidator(password)) {
      setDisplayErrors(true);
    } else {
      const endpoint = "/api/v1/auth";
      const userData = { email, password };
      dispatch(createOrLoginUser(endpoint, userData, props));
      setEmail("");
      setPassword("");
      setDisplayErrors(false);
    }
  };

  const responseGoogle = (data) => {
    if (!data.error) {
      axios
        .post("/omniauth/google/callback", data)
        .then((response) => {
          localStorage.setItem("token", response.data.jwt);
          const payload = {
            user:
              typeof response.data.user === "object"
                ? response.data.user
                : JSON.parse(response.data.user),
          };
          dispatch({ type: "SET_USER", payload: payload });
          props.history.push("/");
          retrieveModalState(["You have been successfully logged in"]);
        })
        .catch((error) => {
          console.log(error);
          const errorMessage = error?.response?.data?.message;
          if (errorMessage) {
            retrieveModalState(errorMessage, 9000);
          } else retrieveModalState(error.message);
        });
    } else {
      console.log(data.error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Paper>
        <DevBlogLogoFrame
          child={<DevBlogLogoWhiteColor />}
          border="solid 1px"
          backgroundMinor={grey[500]}
          shape="15px"
          height="80px"
          width="100px"
        />
        <Typography component="h1" variant="h5">
          DevBlog
        </Typography>
        <FormStyled noValidate onSubmit={handleSubmit}>
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
            value={email}
            onChange={(event) => setEmail(event.target.value)}
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
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {displayErrors && fieldValidator(password, "Password")}
          <Submit
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Submit>
          <Grid container justifyContent="flex-end">
            <Grid item>
              Don't have an account?
              <NavLink to="/signup" variant="body2">
                {" Sign Up"}
              </NavLink>
            </Grid>
            <Grid item>
              <NavLink to="/password-reset" variant="body2">
                {"Forgot password?"}
              </NavLink>
            </Grid>
          </Grid>
        </FormStyled>
      </Paper>

      <br />
      <hr />
      {/* Google button */}
      <div style={{margin: '0 auto', width:'180px', boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 2px 0px, rgba(0, 0, 0, 0.24) 0px 0px 1px 0px'}}>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
            <GoogleLogin
              onSuccess={responseGoogle}
              onError={responseGoogle}
              width='180px'
            />
        </GoogleOAuthProvider>
      </div>
      
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
