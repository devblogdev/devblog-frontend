import React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material';

const CardStyled = styled(Card)(() => ({
  // maxWidth: 345,
  maxWidth: '100%',
  media: {
      // height: 140,
      height: 400,
  },
}))

export default function ExternalImgCardMedia(props) {
   
  const { post } = props
  
  return (
    <CardStyled>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height={props.imageHeight}
          image={post?.images[0].url}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2" align="left">
           <strong>{post.title}</strong>
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p" align="left">
            {post.abstract}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: 'space-around'}}>
        <Button size="small" color="primary">
          Share
        </Button>
        {/* <Button size="small" color="primary">
          Learn More
        </Button> */}
        <Typography 
          variant='body2'
        >
          {/* {post.creation_time?.split(",")[0]} */}
          {post.creation_time}
        </Typography>
      </CardActions>
    </CardStyled>
  );
}
