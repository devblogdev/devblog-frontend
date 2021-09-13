import Button from '@material-ui/core/Button';
import { green, blueGrey, purple, indigo, blue, pink } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

// Custom buttons used in post editor and profile page-START
export const GreenButton = withStyles((theme) => ({
    root: {
      backgroundColor: green[600],
      '&:hover': {
        backgroundColor: green[800],
      },
    },
  }))(Button);

export const DangerButton = withStyles((theme) => ({
    root: {
      backgroundColor: blueGrey[200],
      '&:hover': {
        backgroundColor: blueGrey[400],
      },
    },
  }))(Button);

  export const RemoveImageButton = withStyles((theme) => ({
    root: {
      backgroundColor: purple[600],
      '&:hover': {
        backgroundColor: purple[800],
      },
    },
  }))(Button);
// Custom buttons used in post editor and profile page-END



// Custom buttons used in DevBlogLogo component-START
export const PureBlue = withStyles((theme) => ({
  root: {
    backgroundColor: indigo[400],
    '&:hover': {
      backgroundColor: indigo[700],
    },
    // border: 'solid black 1.5px',
    margin: '4px',
    width: '80px',
    height: '35px',
  },
}))(Button);

export const PureGreen = withStyles((theme) => ({
  root: {
    backgroundColor: green[400],
    '&:hover': {
      backgroundColor: green[700],
    },
    // border: 'solid black 1.5px',
    margin: '4px',
    width: '80px',
    height: '35px',
  },
}))(Button);

export const PurePink = withStyles((theme) => ({
  root: {
    backgroundColor: pink[400],
    '&:hover': {
      backgroundColor: pink[600], 
    },
    // border: 'solid black 1.5px',
    margin: '4px',
    width: '80px',
    height: '35px',
  },
}))(Button);
// Custom buttons used in DevBlogLogo component-START



// Custom buttons used in DevBlogLogoWhiteColor component-START
  export const WhiteBlue = withStyles((theme) => ({
    root: {
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: blue[600],
      },
      marginLeft: '3px',
      marginRight: '3px',
      marginBottom: '4px',
      marginTop: '8px',
      minWidth: '40px',
      height: '20px',
    },
  }))(Button);

  export const WhiteGreen = withStyles((theme) => ({
    root: {
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: green[600],
      },
      marginLeft: '3px',
      marginRight: '3px',
      marginBottom: '4px',
      marginTop: '8px',
      minWidth: '40px',
      height: '20px',
    },
  }))(Button);

  export const WhiteRed = withStyles((theme) => ({
    root: {
      backgroundColor: 'black',
      '&:hover': {
        backgroundColor: pink[500], 
      },
      margin: '2px',
      minWidth: '40px',
      height: '20px',
    },
  }))(Button);
// Custom buttons used in DevBlogLogoWhiteColor component-END

