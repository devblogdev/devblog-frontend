import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DevBlogLogoFrame from '../logo/DevBlogLogoFrame';
import DevBlogLogo from '../logo/DevBlogLogo'


export default function ImgCardMedia(props) {

  const CardStyled = styled(Card)(() => ({
    width: "100%",
    media: {
        height: 540,
        
    },
    objectFit: 'contain',
  }))
   
  const { post } = props

  const abstract = `${post.abstract?.substring(0,185)} ...`

  return (
    <CardStyled>
      <CardActionArea>

        { post.images[0] ? (

          <CardMedia
            component="img"
            alt= {post.title}
            height= {props.imageHeight}
            image= {post.images[0]?.url}
            title= {post.title}
            style ={{ 
              objectFit: 'contain',
            }}
          />

          ) : (
            <DevBlogLogoFrame 
              child={<DevBlogLogo />} 
              backgroundMajor = 'whitesmoke'
            />
          )
        }
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2"  align="left">
          <strong>{post.title}</strong> 
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p" align="left" >
            {abstract || ""}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{ justifyContent: 'space-around'}}>
        <Button size="small" color="primary">
          Share
        </Button>
        {/* <Button size="small" color="primary">
          Continue reading...
        </Button> */}
        <Typography
          variant='body2'
        >
          {post.author_name}
        </Typography>
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
