import React from 'react'

const colorArray = [
    ["pink", 'ec407a'],
    ["teal", '26a69a'],
    ["indigo", '5c6bc0'],
    ["lightBlue", '29b6f6'],
    ["purple", 'ab47bc'],
    ["green", '66bb6a'],
    ["orange", 'ffa726'],
    ["blueGrey", '78909c'],
    ["deepOrange", 'ff7043'],
    ["cyan", '26c6da']
]

const englishAlphabet = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
]

function findAColor(lastNameInitial) {
    let index = englishAlphabet.findIndex( letter => letter === lastNameInitial )
    // For the first 20 letters, use all ten colors
    if (index < 20 ) {
        if ( index % 2 === 0 ) {
            return colorArray[ index/2 ][1] 
        } 
        return colorArray[ (index-1)/2 ][1]
    }
    // For the last 6 letters, use indigo, ligthBlue, and purple
    else if (index > 19) {
        if ( index % 2 === 0 ) {
            return colorArray[ (index-16)/2 ][1] 
        } 
        return colorArray[ (index-17)/2 ][1]
    }
    // For letters not included in alphabet, assign blueGrey
    return colorArray[8][1]

}

// Comments: Options for 'object-fit' property for an image tag:
// fill - This is default. The image is resized to fill the given dimension. If necessary, the image will be stretched or squished to fit
// contain - The image keeps its aspect ratio, but is resized to fit within the given dimension
// cover - The image keeps its aspect ratio and fills the given dimension. The image will be clipped to fit
// none - The image is not resized
// scale-down - the image is scaled down to the smallest version of none or contain


export default function ProfileImage( { imgSource = null, first_name = "D", last_name ="B", alt = "", size ='72px', background =null } ) {

    if (imgSource) {
        return (
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <img 
                    alt= {alt} 
                    src= {imgSource}
                    width= {size}
                    height= {size}
                    style = {{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        // border: 'solid 2px',
                    }}
                />          
            </div>
        )
    } else {

        const lastNameInitial = last_name[0].toUpperCase()
        const initials = first_name[0].toUpperCase() + last_name[0].toUpperCase()

        return (
            <div 
                style={{
                    display: 'flex',
                    justifyContent: 'center'
                }}
            >
                <div  
                    style= {{
                        width: size,
                        height: size,
                        borderRadius: '50%',
                        // border: 'solid 2px black',
                        color: 'white',
                        fontSize: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: background || `#${findAColor(lastNameInitial)}`
                    }}
                >
                    {initials}
                </div>       
            </div>
        )
    }
}

