import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
// import auth from '../components/security/auth'
import Button from '@material-ui/core/Button';
import axios from 'axios'

// MATERIAL UI DEPENDENCIES

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
// import Header from './Header';
// import MainFeaturedPost from './MainFeaturedPost';
// import FeaturedPost from './FeaturedPost';
// import Main from './Main';
// import Sidebar from './Sidebar';
import Footer from '../components/footer/footer';
// import post1 from './blog-post.1.md';
// import post2 from './blog-post.2.md';
// import post3 from './blog-post.3.md';

// MATERIAL UI STYLES
const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));
// MATERIAL UI
const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];
// MATERIAL UI
const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random',
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

// MATERIAL UI
const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random',
    imageText: 'Image Text',
  },
];

// const posts = [post1, post2, post3];

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

// MAIN COMPONENT; FUNCTIONAL COMPONENT
const Home = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch()

    useEffect(() => {
        if (props.match.url === "/logout") {
            dispatch({type: 'LOGOUT_USER'})
            props.history.replace('/')
            // console.log("useEffect called in Home")
        }
    })
    // console.log("Home was called")
    const handleClick = event => {
        console.log("HELLO")
        axios.get("posts")
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }

    return (
        <div>
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        {/* <Header title="Blog" sections={sections} /> */}
        <h1>Welcome to DevBlog</h1>
            <Button 
                onClick = {handleClick}
            >Get Posts
            </Button>
        <main>
          {/* <MainFeaturedPost post={mainFeaturedPost} /> */}
          <Grid container spacing={4}>
            {/* {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))} */}
          </Grid>
          <Grid container spacing={5} className={classes.mainGrid}>
            {/* <Main title="From the firehose" posts={posts} /> */}
            {/* <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            /> */}
          </Grid>
        </main>
      </Container>
      {/* <Footer title="Footer" description="Something here to give the footer a purpose!" /> */}
    </React.Fragment>
        </div>
    )
}

export default Home