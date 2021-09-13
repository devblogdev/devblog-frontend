import React from 'react'
// import { purple, grey, red, blueGrey, indigo } from '@material-ui/core/colors'
// import { purple, blueGrey} from '@material-ui/core/colors'
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         border: `solid  1px`,
//         borderColor: `${purple[400]}`,
//           "&:hover": {
//             borderColor: `${purple[400]}`, 
//         },
//         backgroundColor: grey[400],
//         backgroundColor:"gray",
//         background: 'linear-gradient(rgba(192,192,192,1.0),transparent)',
//     },
//   }));

export default function DevBlogLogoFrame( 
    { 
        child, 
        backgroundMajor, 
        backgroundMinor, 
        border, 
        shape, 
        height, 
        width 
    } ) {

    // const myclass = useStyles(border, borderHover)

    return (
        <div 
            style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor: backgroundMajor,
                width: '90%',
                margin: 'auto',
            }}
        >
            <div  
                // className= {myclass.root}
                style= {{
                    boxSizing: 'border-box',
                    width: width || '220px',
                    height: height || '140px',
                    borderRadius: shape,
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: border,
                    backgroundColor: backgroundMinor,
                }}
            >
                {child}  
            </div>       
        </div>
    )
}