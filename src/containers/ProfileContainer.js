import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { authorization } from '../actions/securityActions'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import blueGrey from '@material-ui/core/colors/blueGrey';
import ProfileForm from '../components/users/ProfileForm'


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`a11y-tabpanel-${index}`}
      aria-labelledby={`a11y-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {/* <Typography>{children}</Typography> */}
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const color = blueGrey[800];

function DemoTabs(props) {
  const { labelId, onChange, selectionFollowsFocus, value } = props;
  return (
    <AppBar position="static">
      <Tabs
        aria-labelledby={labelId}
        onChange={onChange}
        selectionFollowsFocus={selectionFollowsFocus}
        value={value}
        centered
        style={{
          backgroundColor: color
        }}
      >
        <Tab label="Drafts" aria-controls="a11y-tabpanel-0" id="a11y-tab-0" />
        <Tab label="Published" aria-controls="a11y-tabpanel-1" id="a11y-tab-1" />
        <Tab label="My Info" aria-controls="a11y-tabpanel-2" id="a11y-tab-2" />
      </Tabs>
    </AppBar>
  );
}

DemoTabs.propTypes = {
  labelId: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectionFollowsFocus: PropTypes.bool,
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles ((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function ProfileContainer({ user, posts, token, ...routerProps}) {

  const dispatch = useDispatch()
  const classes = useStyles();
  const [drafts, setDrafts] = useState([])
  const [published, setPublished] = useState([])

  useEffect(() => {
      dispatch(authorization())
      console.log("Authorization called in profile")
  },[dispatch])

  const loadedDrafts = useCallback ( () => user.posts?.filter( post => post.status === "draft").map((post,index) => {
      return <li key={index}><Link to= {`${routerProps.match.url}/drafts/${post.id}`}>{post.title}</Link></li>}
    ),[user.posts, routerProps.match.url])

  const loadedPublished = useCallback ( () => posts.filter( post => post.status === "published" && post.user_id === user.id).map((post,index) => 
      <li key={index}><Link to= {`/posts/${post.id}`}>{post.title}</Link></li>
    ),[posts, user])

  useEffect(() => {
      setDrafts(loadedDrafts())
      setPublished(loadedPublished())
  },[loadedDrafts, loadedPublished])

  
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  console.log(published)

  return (
    <Container>
      <div className={classes.root}>
        {/* <Typography id="demo-a11y-tabs-manual-label"> */}
          <h3>Welcome to your profile, {user.first_name}</h3>
        {/* </Typography> */}
        <DemoTabs labelId="demo-a11y-tabs-manual-label" onChange={handleChange} value={value} />

        <TabPanel value={value} index={0}>
          <Link 
              to = {`${routerProps.match.url}/drafts/new`}
              style = {{ textDecoration: 'none' }} 
          >
              <Button 
                color="primary" variant="contained" component="span"
                size="small"
                disableElevation
                style={{ marginBottom: '1rem'}}
              >
                New Post
              </Button>
          </Link>
          {drafts}
        </TabPanel>

        <TabPanel value={value} index={1} style={{textAlign: ''}}>
          {published}
        </TabPanel>

        <TabPanel value={value} index={2}>
            <ProfileForm user={user} />
        </TabPanel>

      </div>
    </Container>
  )
  
}



