import Button from '@mui/material/Button';
import { green, blueGrey, purple, indigo, blue, pink } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

// Custom buttons used in post editor and profile page-START
export const GreenButton = styled(Button)({
  backgroundColor: green[600],
  '&:hover': {
    backgroundColor: green[800],
  },
});

export const DangerButton = styled(Button)({
  backgroundColor: blueGrey[200],
  '&:hover': {
    backgroundColor: blueGrey[400],
  },
  color: '#000000DE'
});

export const RemoveImageButton = styled(Button)({
  backgroundColor: purple[600],
  '&:hover': {
    backgroundColor: purple[800],
  },
});
// Custom buttons used in post editor and profile page-END



// Custom buttons used in DevBlogLogo component-START
export const PureBlue = styled(Button)({
  backgroundColor: indigo[400],
  '&:hover': {
    backgroundColor: indigo[700],
  },
  // border: 'solid black 1.5px',
  margin: '4px',
  width: '80px',
  height: '35px',
});

export const PureGreen = styled(Button)({
  backgroundColor: green[400],
  '&:hover': {
    backgroundColor: green[700],
  },
  // border: 'solid black 1.5px',
  margin: '4px',
  width: '80px',
  height: '35px',
});

export const PurePink = styled(Button)({
  backgroundColor: pink[400],
  '&:hover': {
    backgroundColor: pink[600], 
  },
  // border: 'solid black 1.5px',
  margin: '4px',
  width: '80px',
  height: '35px',
});
// Custom buttons used in DevBlogLogo component-START



// Custom buttons used in DevBlogLogoWhiteColor component-START
export const WhiteBlue = styled(Button)({
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
});

export const WhiteGreen = styled(Button)({
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
})

export const WhiteRed = styled(Button)({
  backgroundColor: 'black',
  '&:hover': {
    backgroundColor: pink[500], 
  },
  margin: '2px',
  minWidth: "40px",
  height: '20px',
});
// Custom buttons used in DevBlogLogoWhiteColor component-END

