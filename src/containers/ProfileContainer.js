import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authorization } from '../actions/securityActions'


import PropTypes from 'prop-types';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Link } from 'react-router-dom'

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
          <Typography>{children}</Typography>
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
        // textColor=""
        style={{
          backgroundColor: "black"
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
    // backgroundColor: '#2e1534'
  },
}));

export default function ProfileContainer(props) {

  const dispatch = useDispatch()

  // const [isLoaded, setIsLoaded] = useState(false)
  // const [currentUser, setCurrentUser] = useState(props.user);
  // const user = useSelector((state) => state.users.current_user)
  const [drafts, setDrafts] = useState([])
  const current_user = useSelector((state) => state.users.current_user)
  // const [published, setPublshed] = useState(null);

  

  useEffect(() => {
      dispatch(authorization())
      console.log("USE EFFECT WAS CALLED")
  },[dispatch])

  useEffect(() => {
    console.log("User loaded")
    console.log(current_user)
    const loadedDrafts = current_user.posts?.filter( post => post.status === "draft").map((post,index) => 
    <li key={index}><Link to= {`/profile/drafts/${post.id}`}  >
      {post.body}
    </Link>
    </li>
  )
    setDrafts(loadedDrafts)
  },[current_user])
  // console.log(props)




  
 
  console.log(props)
  
  // let current_user
  // let posts
  
  // let published
  // let drafts
  // //  posts = currentUser.posts
  // drafts = current_user.posts?.filter( post => post.status === "draft").map((post,index) => 
  //   <li key={index}><Link to= {`/profile/drafts/${post.id}`}  >
  //     {post.body}
  //   </Link>
  //   </li>
  // )
  //  published =posts.filter( post => post.status === "published").map((post,index) => 
  // <li><Link to= {`/posts/${post.id}`} key={post.id} >
  //   {post.body}
  // </Link>
  // </li>
  // )

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
    <div className={classes.root}>
        <h2>Welcome to your profile {props.user.email}</h2>
      <Typography id="demo-a11y-tabs-manual-label">
        Tabs where each tab needs to be selected manually
      </Typography>
      <DemoTabs labelId="demo-a11y-tabs-manual-label" onChange={handleChange} value={value} />
      <TabPanel value={value} index={0}>
        {drafts}
        {/* {currentUser} */}
      </TabPanel>
      <TabPanel value={value} index={1}>
        {/* {published} */}
      </TabPanel>
      <TabPanel value={value} index={2}>
        {/* {Item Three} */}
      </TabPanel>
    </div>
    </Container>
  )
  
}




// export default function ProfileContainer(props) {

  

//     return (
        

//     )
// }