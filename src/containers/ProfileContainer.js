import React, { useEffect, useState, useCallback, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authorization } from '../actions/securityActions'
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import blueGrey from '@mui/material/colors/blueGrey';
import ProfileForm from '../components/users/ProfileForm'
import { ActivationContext } from '../components/users/ActivationContext';
import { scheduleImagesForDestruction } from '../actions/imageActions';



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

const StyledTab = styled((props) => <Tab {...props} />)(
  ({theme}) => ({
     color: '#fff',
     opacity: 0.7,
    '&.Mui-selected': {
      color: '#fff',
      opacity: 1,
    },
    '@media (min-width: 600px)': {
      minWidth: '160px'
    },
  })
)

function DemoTabs(props) {
  const { labelId, onChange, selectionFollowsFocus, value } = props;
  const { deactivate } = useContext(ActivationContext)
  // When the user clicks on the "MY INFO" tab, disable (deactivate) the textfields in the MY INFO tab
  // (in the event the user did not click on 'Cancel' before leaving the MY INFO tab)
  const handleFocus = () => deactivate()    
  // Here the "deactivate()" function from ActivationContext toggles the "active" ActivationContext variable present in the ProfileForm.js component to deactivate the buttons
  // AND the textfields present in the profile form when the user leaves the "MY INFO" tab in the UI under which the profile form is rendered
  return (
    <AppBar position="static">
      <Tabs
        aria-labelledby={labelId}
        onChange={onChange}
        indicatorColor='secondary'
        variant='fullWidth'
        selectionFollowsFocus={selectionFollowsFocus}
        value={value}
        centered
        style={{
          backgroundColor: color
        }}
      >
        <StyledTab label="Drafts" aria-controls="a11y-tabpanel-0" id="a11y-tab-0" />
        <StyledTab label="Published" aria-controls="a11y-tabpanel-1" id="a11y-tab-1" />
        <StyledTab label="My Info" aria-controls="a11y-tabpanel-2" id="a11y-tab-2" onFocus={handleFocus} />
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

const Root = styled('div')(() => ({
  flexGrow: 1,
}))

export default function ProfileContainer({ user, posts, token, ...routerProps}) {

  const dispatch = useDispatch()
  const [drafts, setDrafts] = useState([])
  const [published, setPublished] = useState([])
  const { history, retrieveModalState } = routerProps

  const previousPath = routerProps.location.state?.from.pathname
  const initial = useSelector((state) => state.images.currentDraftOrPostBodyImages.newImages)

  useEffect(() => {
      console.log("Authorization dispatcher in ProfileContainer was called")
      // Note: the 'authorization' function is always called when page is reloaded (in app.js useEffect); 
      // to avoid making two calls to 'authorization' on page reload when user is in the '/profile' page
      // only call it when the user has already been set (that is, user is looged in and clicks on "My Profile" tab)
      // which will revalidate the user credentials (the user token) for accessing the profile tab
      // if(Object.keys(user).length) {
        dispatch(authorization(null, { history, retrieveModalState }))
      // }
  },[dispatch, history, retrieveModalState])
 
  useEffect( () => {
      if( (previousPath?.includes("/profile/drafts/") || previousPath?.includes("/posts/edit/")) && initial.size ) scheduleImagesForDestruction(initial, new Set()) 
      // FATAL ERROR: do not dispatch an action here that updates the 'initial' redux variables included in the dependency array of this useFeect
      // doing so will cause the component to rerender and make the code in useEffect to run again, causing an infinite loop 
  },[previousPath, initial] )

  const loadedDrafts = useCallback ( () => user.posts?.filter( post => post.status === "draft").map((post,index) => {
          return <li key={index}>
                    <h3><Link to= {`${routerProps.match.url}/drafts/${post.id}`}>{post.title}</Link></h3>
                    <span>{post.creation_time}</span>
                 </li>
        }),[user.posts, routerProps.match.url])

  const loadedPublished = useCallback ( () => posts.filter( post => post.status === "published" && post.user_id === user.id).map((post,index) => 
      <li key={index}>
          <h3><Link to= {`/posts/${post.id}`}>{post.title}</Link></h3>
          <span>{post.creation_time}</span>
      </li>
    ),[posts, user])

  useEffect(() => {
      setDrafts(loadedDrafts())
      setPublished(loadedPublished())
  },[loadedDrafts, loadedPublished])

  
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);    
  };

  console.log("Profile container rendered")

  return (
    <Container>
      <Root className='profile-container'>
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
                style={{ marginBottom: '1rem', textDecoration: 'none'}}
              >
                New Post
              </Button>
          </Link>
          <ul>{drafts}</ul>
        </TabPanel>

        <TabPanel value={value} index={1} style={{textAlign: ''}}>
          <ul>{published}</ul>
        </TabPanel>

        <TabPanel value={value} index={2}>
            <ProfileForm user={user} {...routerProps} />
        </TabPanel>
      </Root>
    </Container>
  )
  
}



