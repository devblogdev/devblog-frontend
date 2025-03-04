// import Button from '@mui/material/Button'
import { PureBlue, PurePink, PureGreen } from '../decorators/Buttons'
import { Typography } from '@mui/material';

export default function DevBlogLogo() {
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
                <PureBlue
                    color="primary" variant="contained" component="span"
                    disableElevation
                    size='small'
                ><Typography variant="h6">
                    D
                </Typography>
                </PureBlue>

                <PureGreen
                    color="primary" variant="contained" component="span"
                    disableElevation
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
                    size='small'
                ><Typography variant="h6">
                    B
                </Typography>
                </PurePink>
            </div>
        </div>
    )
}