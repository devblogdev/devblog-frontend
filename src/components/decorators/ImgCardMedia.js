import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



export default function ImgCardMedia(props) {

  const useStyles = () => makeStyles({
    root: {
      width: "100%",
      media: {
          height: 540,
      },
    },
  });
   
  const classes = useStyles();
  const { post } = props

  const abstract = `${post.abstract?.substring(0,200)} ...`

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt= {post.title}
          height= {props.imageHeight}
          image= {post.images[0]?.url}
          title= {post.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {post.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {abstract}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Continue reading...
        </Button>
      </CardActions>
    </Card>
  );
}
