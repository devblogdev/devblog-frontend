import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import Container from "@mui/material/Container";
import { authorization } from "./actions/securityActions";
import { fetchPosts } from "./actions/postsAndCommentsActions";
import { fetchUsers } from "./actions/userActions";
import Home from "./containers/Home";
import PostLinksContainer from "./containers/PostLinksContainer";
import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import ProfileContainer from "./containers/ProfileContainer";
import PostEditor4 from "./components/PostEditor/PostEditor4";
import PostsAndCommentsContainer from "./containers/PostsAndCommentsContainer";
import AuthorsLinksContainer from "./containers/AuthorsLinksContainer";
import AuthorContainer from "./containers/AuthorContainer";
import ManageLogin from "./containers/ManageLogin";
import Modal from "./components/modal/Modal";
import { ModalContext } from "./components/modal/ModalContext";
import { Helmet } from "react-helmet";
import { BareNav } from "./components/navbar/BareNav";
import About from "./containers/About";

function App() {
  const dispatch = useDispatch();
  // Note: 'current_user' is an importnat variable; attempted to remove it from App.js and place it where it directly on the
  // components where it is used to reduce the number of rerenders; however, this caused errors in the post editor (post editor does not load); keep it here for now
  const current_user = useSelector((state) => state.users.current_user);
  const users = useSelector((state) => state.users.users);
  const posts = useSelector((state) => state.posts.posts);

  // FATAL ERROR: DO NOT LOAD the variables from the images reducer here in app component;
  // when an action is dispatched to change these variables, the effect will propagte throughout the
  // whole app (will cause app component to rerender). This can lead to infinte loops: Real example: the 2nd useEffect block
  // in Post Editor component changes the images redux variable(s); if these variables are required in here in app.js, you will get an infinite loop
  // as the change from useEffect block will cause app component to rerender, then post component rerenders, and then useEffect block is called again.
  // Another effect will be in the post editor component; when editing a previously saved post, dispatching
  // an action from within the post editor component to change the images redux variabls VIA AN EVENT LISTTERNER (such as onBlur)
  // will cause the app to rerender, and the editor will rerender as well, causing the code inside the first
  // useEffect block in editor to be executed again..., result: the editor will be reinitialized with the contents
  // with which it was loaded first time, cuasing all the edits to be lost.

  const { displayModeModal, modalMessage, retrieveModalState } =
    useContext(ModalContext);
  const history = useHistory();

  useEffect(() => {
    // note: history does not load here (it is undefined); need to investigate reason
    console.log("Auhorization dispatcher in App.js was called");
    dispatch(authorization(null, { history, retrieveModalState })); // Note: 'authorization' affects one state variable: state.users.current_user; this triggers 1 render of App component (and the whole App as well); if user is not logged in, then no rerender is triggered
  }, [dispatch, history, retrieveModalState]);

  useEffect(() => {
    const endpoint = "/posts";
    dispatch(fetchPosts(endpoint)); // Note: 'fetchPosts' affects two state varibles: state.posts.posts and state.posts.message; this will trigger 2 renders of App component (and the whole App as well)
    dispatch(fetchUsers("/users")); // Note: 'fecthUsers' affects oene state variable: state.users.users; this triggers 1 render of App component (and the whole App as well)
    console.log("Posts dispatcher was called"); // Total renders after the useEffects: 5 (1 normal render, and 4 renders from the dispatchers (if user is logged in; otherwise 4 total renders))
  }, [dispatch]);

  console.log("App was Rendered");
  return (
    <Router>
      <div className="App">
        <Helmet>
          {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
          {/* <!-- COMMON TAGS --> */}
          <title>DevBlog</title>
          {/* <!-- Search Engine --> */}
          <meta
            name="description"
            content="Blog website for coding related posts"
          />
          <meta
            name="image"
            content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"
          />
          {/* <!-- Schema.org for Google --> */}
          <meta itemprop="name" content="DevBlog" />
          <meta
            itemprop="description"
            content="Blog website for coding related posts"
          />
          <meta
            itemprop="image"
            content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"
          />
          {/* <!-- Open Graph general (Facebook, Pinterest & Google+) --> */}
          <meta name="og:title" content="DevBlog" />
          <meta
            name="og:description"
            content="Blog website for coding-related posts. Browse all of the website's resources for free; login to create blog posts and customize your author page."
          />
          <meta
            name="og:image"
            content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"
          />
          <meta name="og:url" content="https://devblog.dev" />
          <meta name="og:site_name" content="DevBlog" />
          {/* <!-- Open Graph for LinkedIn & Microsoft --> */}
          <meta property="og:title" content="DevBlog" />
          <meta
            property="og:image"
            content="https://user-images.githubusercontent.com/75151961/138567246-01b18138-9eb4-4d64-973b-7965083a26a8.png"
          />
          {/* <meta property='og:description' content="Blog website for coding related posts" /> */}
          <meta property="og:url" content="https://devblog.dev" />
          {/* <!-- ADDED USING https://megatags.co/#generate-tags --> */}
        </Helmet>
        <div className="Nav-addon"></div>
        <BareNav />
        {/* 'Modal' is the general messaging system of the app; Modal is not used for displaying meesages while a component is loading, instead, the posts' 'message' variable is used for this purpose, found in reducers/PostsAndComentsReducer.js */}
        <Modal
          displayModeModal={displayModeModal}
          modalMessage={modalMessage}
        />
        {/* <p style={{ color: "red", fontWeight: "bold" }}>
          The backend for DevBlog is currently undergoing an upgrade; <br />
          please come back later
        </p> */}
        <Container className="main" maxWidth="lg">
          <Switch>
            <Route
              exact
              path="/"
              render={(routerProps) => (
                <Home
                  {...routerProps}
                  posts={posts}
                  retrieveModalState={retrieveModalState}
                />
              )}
            />
            <Route
              exact
              path="/posts"
              render={(routerProps) => (
                <PostLinksContainer {...routerProps} posts={posts} />
              )}
            />
            <Route
              exact
              path="/logout"
              render={(routerProps) => <Home {...routerProps} posts={posts} />}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={ProfileContainer}
              user={current_user}
              posts={posts}
              retrieveModalState={retrieveModalState}
            />
            <ProtectedRoute
              path="/profile/drafts/new"
              component={PostEditor4}
              user={current_user}
              posts={posts}
              retrieveModalState={retrieveModalState}
            />
            <ProtectedRoute
              path="/profile/drafts/:postID"
              component={PostEditor4}
              user={current_user}
              posts={posts}
              retrieveModalState={retrieveModalState}
            />
            <ProtectedRoute
              path="/posts/edit/:postID"
              component={PostEditor4}
              user={current_user}
              posts={posts}
              retrieveModalState={retrieveModalState}
            />
            <Route
              path={`/posts/:postID`}
              render={(routerProps) => (
                <PostsAndCommentsContainer
                  {...routerProps}
                  posts={posts}
                  users={users}
                  user={current_user}
                />
              )}
            />
            <Route
              path={"/authors/:authorID"}
              render={(routerProps) => (
                <AuthorContainer {...routerProps} authors={users} />
              )}
            />
            <Route
              exact
              path="/authors"
              render={(routerProps) => (
                <AuthorsLinksContainer {...routerProps} authors={users} />
              )}
            />
            <Route
              exact
              path="/about"
              render={(routerProps) => (
                <About
                  {...routerProps}
                  retrieveModalState={retrieveModalState}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={(routerProps) => (
                <ManageLogin
                  {...routerProps}
                  retrieveModalState={retrieveModalState}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={(routerProps) => (
                <ManageLogin
                  {...routerProps}
                  retrieveModalState={retrieveModalState}
                />
              )}
            />
            <Route
              path="/registration-confirmation"
              render={(routerProps) => (
                <ManageLogin
                  {...routerProps}
                  retrieveModalState={retrieveModalState}
                />
              )}
            />
            <Route
              path="/password-reset"
              render={(routerProps) => (
                <ManageLogin
                  {...routerProps}
                  retrieveModalState={retrieveModalState}
                />
              )}
            />

            <Route
              path={`/:author_slug/:post_slug`}
              render={(routerProps) => (
                <PostsAndCommentsContainer
                  {...routerProps}
                  posts={posts}
                  users={users}
                  user={current_user}
                />
              )}
            />
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
