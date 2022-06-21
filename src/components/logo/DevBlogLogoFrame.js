import React from 'react'

export default function DevBlogLogoFrame( 
    { 
        child, 
        backgroundMajor, 
        backgroundMinor, 
        border, 
        shape, 
        height, 
        width 
    }) {
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