import S3 from 'react-aws-s3'
import axios from 'axios'

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}

const ReactS3Client = new S3(config)

const token = localStorage.getItem('token')

const axiosConfig = {
    headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${token}`   
    }
}

const uploadImage =  async (file) => {
    // Upload the image to Amazon S3 bucket
    if (file) {
        console.log("uploadImage called")
        const res = await ReactS3Client.uploadFile(file)
        .catch(error => { 
            console.log(error) 
            return []
        })
        const images_attributes = [{
            name: file.name,
            size: file.size,
            url: res.location,
            s3key: res.key
        }]
        console.log(images_attributes)
        return images_attributes
    } return []
}

const deleteImage = () => {
    ReactS3Client.deleteFile()
    .then((response) => {
        console.log('Success:', response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

const updateImage = () => {

}

export function manageImageForNewDraftOrPost(imageData) {
    // returns a promise; promise is resolved in Post Editor
    return uploadImage(imageData)
}

export function manageImageForDraftOrPost(postData, imageData) {
    if (postData.images[0] !== undefined && imageData === undefined) {
        deleteImage(postData)
    } else if (postData.images[0] !== undefined && imageData !== undefined) {
        if ( postData.images[0].name !== imageData.name || postData.images[0].size !== imageData.size ) {
            updateImage(imageData)
        }
    }
  
}





