import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
//THIS COMPONENT IS NOT USED IN THE APP
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

export default function LetterAvatars(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Avatar>H</Avatar>
      <Avatar className={classes.orange}>N</Avatar> */}
      <Avatar className={classes.purple}>{props.first_name[0]}{props.last_name[0]}</Avatar>
    </div>
  );
}
