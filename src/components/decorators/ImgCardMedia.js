import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DevBlogLogoFrame from '../logo/DevBlogLogoFrame';
import DevBlogLogo from '../logo/DevBlogLogo'


export default function ImgCardMedia(props) {

  const useStyles = () => makeStyles({
    root: {
      width: "100%",
      media: {
          height: 540,
          
      },
      objectFit: 'contain',
    },
  });
   
  const classes = useStyles();
  const { post } = props

  const abstract = `${post.abstract?.substring(0,200)} ...`

  return (
    <Card className={classes.root}>
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
        <Button size="small" color="primary">
          Continue reading...
        </Button>
        <Typography
          variant='body2'
        >
          {post.author_name}
        </Typography>
        <Typography 
          variant='body2'
        >
          {post.creation_time?.split(",")[0]}
        </Typography>
      </CardActions>
    </Card>
  );
}
