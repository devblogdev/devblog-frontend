import React from 'react'
// import { purple, grey, red, blueGrey, indigo } from '@material-ui/core/colors'
// import { makeStyles } from '@material-ui/core/styles';


// const useStyles = makeStyles((theme) => ({
//     root: {
//         border: `solid  1px`,
//         borderColor: `${purple[400]}`,
//           "&:hover": {
//             borderColor: `${purple[700]}`, 
//         },
//         backgroundColor: grey[400],
//         backgroundColor:"gray",
//         background: 'linear-gradient(rgba(192,192,192,1.0),transparent)',
        
//     },
//   }));

export default function DevBlogLogoFrame( {child} ) {

    // const myclass = useStyles()

    return (
        <div 
            // className= {myclass.root}
            style={{
                display: 'flex',
                justifyContent: 'center',
                backgroundColor:"whitesmoke",
                width: '90%',
                margin: 'auto'
            }}
        >
            <div  
                style= {{
                    boxSizing: 'border-box',
                    width: '220px',
                    height: '140px',
                    borderRadius: '15px',
                    fontSize: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                {child}  
            </div>       
        </div>
    )
}