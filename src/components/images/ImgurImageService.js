//  This image service is used to upload pictures to Imgur and load them in the body 
// of a post in the post editor
import React, {useState}  from 'react'
import axios from "axios"



export default function ImgurImageService(){

    const [file, setFile] = useState()
    const [preview, setPreview] = useState()

    
    const uploadToImgur = async () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Beare ' + process.env.REACT_APP_IMGUR_ACESS_TOKEN    
            }
        }
        await axios.post("https://api.imgur.com/3/upload", file, axiosConfig)
        .then(response => console.log(response))
        .catch(error => console.log(error.response))    
    }


    const handleOnChange = (event) => {
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]))
            setFile(event.target.files[0])
            
        }
    }

    return(
        <div>
            <input 
                type= 'file'
                accept="image/*"
                onChange = {handleOnChange}
                

            />
            <button onClick={uploadToImgur}>
                SEND
            </button>
            <img src= {preview || file} alt="" />
        </div>
    )
}