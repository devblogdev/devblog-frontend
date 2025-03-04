import { WhiteBlue, WhiteGreen, WhiteRed } from "../decorators/Buttons";
import { Typography } from '@mui/material';


export default function DevBlogLogoWhiteColor(props) {
    
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
                <WhiteBlue
                    color ="primary" variant="contained" component="span"
                    disableElevation
                    size='small'
                    className={props.navLogo ? "navLogo" : ""}
                ><Typography variant="caption"> 
                    D
                </Typography>
                </WhiteBlue>

                <WhiteGreen
                    color ="primary" variant="contained" component="span"
                    disableElevation
                    size='small'
                    className={props.navLogo ? "navLogo" : ""}
                > <Typography variant="caption" >
                    V
                </Typography>
                </WhiteGreen>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}} >
                <WhiteRed
                    color ="primary" variant="contained" component="span"
                    disableElevation
                    size="small"
                    className={props.navLogo ? "navLogo" : ""}
                ><Typography variant="caption" >
                    B
                </Typography>
                </WhiteRed>
            </div>
        </div>
    )
}