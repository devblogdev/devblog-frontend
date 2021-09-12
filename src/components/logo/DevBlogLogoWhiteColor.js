import { WhiteBlue, WhiteGreen, WhiteRed } from "../decorators/Buttons";
import { Typography } from '@material-ui/core';


export default function DevBlogLogoWhiteColor() {
    
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
                <WhiteBlue
                    variant="contained" component="span"
                    disableElevation
                    size='small'
                ><Typography >
                    D
                </Typography>
                </WhiteBlue>

                <WhiteGreen
                    variant="contained" component="span"
                    disableElevation
                    size='small'
                > <Typography  >
                    V
                </Typography>
                </WhiteGreen>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
                <WhiteRed
                    variant="contained" component="span"
                    disableElevation
                    size='small'
                ><Typography >
                    B
                </Typography>
                </WhiteRed>
            </div>
        </div>
    )
}