import Button from '@material-ui/core/Button';
import { green, blueGrey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';


export const GreenButton = withStyles((theme) => ({
    root: {
      backgroundColor: green[600],
      '&:hover': {
        backgroundColor: green[800],
      },
      // marginTop: '8px',
      // marginBottom: '8px',
      // marginLeft: '4px',
      // marginRight: '4PX',
    },
  }))(Button);

export const DangerButton = withStyles((theme) => ({
    root: {
      backgroundColor: blueGrey[200],
      '&:hover': {
        backgroundColor: blueGrey[400],
      },
      // marginTop: '8px',
      // marginBottom: '8px',
      // marginLeft: '4px',
      // marginRight: '4PX',
    },
  }))(Button);