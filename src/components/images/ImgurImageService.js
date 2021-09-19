//  This image service is used to upload pictures to Imgur and load them in the body 
// of a post in the post editor
import React, {useState}  from 'react'
import axios from "axios"



export default function ImgurImageService(){

    const [file, setFile] = useState()
    const [preview, setPreview] = useState()

    
    const uploadToImgur = () => {
        const axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Bearer ' + process.env.REACT_APP_IMGUR_ACCESS_TOKEN 
            }
        }
        axios.post("https://api.imgur.com/3/image/", file, axiosConfig)
        .then(response => console.log(response))
        .catch(error => console.log(error.response))    
    }

    const uploadToImgur2 = () => {
        const axiosConfig2 = {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": 'Client-ID ' + process.env.REACT_APP_IMGUR_CLIENT_ID
            }
        }
        axios.post("https://api.imgur.com/3/image/", file, axiosConfig2)
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
                Upload 1
            </button>
            <button onClick={uploadToImgur2}>
                Upload 2
            </button>
            <img src= {preview || file} alt="" />
        </div>
    )
}