import React from 'react';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
//THIS COMPONENT IS NOT USED IN THE APP

const Root = styled('div')(({ theme }) => ({
  display: 'flex',
  '& > *': {
    margin: theme.spacing(1),
  },
}))

const AvatarStyled = styled(Avatar)(({ theme}) => ({
  color: theme.palette.getContrastText(deepPurple[500]),
  backgroundColor: deepPurple[500],
}))

export default function LetterAvatars(props) {
  
  return (
    <Root>
      <AvatarStyled>{props.first_name[0]}{props.last_name[0]}</AvatarStyled>
    </Root>
  );
}
