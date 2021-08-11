import S3 from 'react-aws-s3'

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}

const ReactS3Client = new S3(config)

const token = localStorage.getItem('token')

const uploadImage =  async (file) => {
    // Upload the image to Amazon S3 bucket
    // debugger
    if (file && token) {
        console.log("upload image called")
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

const deleteImage = async (postImage) => {
    // Delete the image from Amazon S3 bucket
    if (token) {
        console.log("delete image called")
        await ReactS3Client.deleteFile(postImage.s3key)
            .catch((error) => {
                console.error('Error:', error);
            });
        console.log("Delete image from S3 was called")
        return []
    } return []
}

const updateImage = async (postImage, imageData) => {
    // Update the image in Amazon S3 bucket
    if (token) {
        console.log("update image called")
        await ReactS3Client.uploadFile(imageData, postImage.s3key)
        .catch(error => { 
            console.log(error) 
            return [postImage]
        })
        const images_attributes = [{
            name: imageData.name,
            size: imageData.size,
            url: postImage.url,
            s3key: postImage.s3key
        }]
        console.log(images_attributes)
        return images_attributes
    } return []
}

export function manageImageForNewDraftOrPost(imageData) {
    // returns a promise; promise is resolved in Post Editor
    return uploadImage(imageData)
}

export function manageImageForDraftOrPost(currentPost, imageState) {
    // This function may return a promise; promise is resolved in Post Editor
    // debugger
    console.log("Image manager called")
    let images = currentPost.images
    let imageData = imageState
    // If the post has an image on record, and there no image included in post editor, delete the post's record image
    if (images[0] !== undefined && imageData === undefined) {
        return deleteImage(images[0])
    // If the post has an image on record, and there is an image included in post editor, if there is a difference in name or size, replace the post's record image; otherwise, leave the current record's image
    } else if (images[0] !== undefined && imageData !== undefined) {
        if ( images[0].name !== imageData.name || images[0].size !== imageData.size ) {
            return updateImage(images[0], imageData)
        } return [images[0]]
    // If the post has no image on record and there is an image included in post editor, upload the image to Amazon S3
    } else if (images[0] === undefined && imageData !== undefined) {
        return uploadImage(imageData)
    } return []
}





