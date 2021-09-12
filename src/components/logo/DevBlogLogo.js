// import Button from '@material-ui/core/Button'
import { PureBlue, PurePink, PureGreen } from '../decorators/Buttons'
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
      margin: '4px',
      width: '80px',
      height: '35px'
    },
  }));

export default function DevBlogLogo() {
    const classes = useStyles();
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
                <PureBlue
                    color="primary" variant="contained" component="span"
                    disableElevation
                    className={classes.root}
                    size='small'
                ><Typography variant="h6">
                    D
                </Typography>
                </PureBlue>

                <PureGreen
                    color="primary" variant="contained" component="span"
                    disableElevation
                    className={classes.root}
                    size='small'
                > <Typography variant="h6" >
                    V
                </Typography>
                </PureGreen>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
                <PurePink
                    color="secondary" variant="contained" component="span"
                    disableElevation
                    className={classes.root}
                    size='small'
                ><Typography variant="h6">
                    B
                </Typography>
                </PurePink>
            </div>
        </div>
    )
}