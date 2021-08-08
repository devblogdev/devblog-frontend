import S3 from 'react-aws-s3'

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}

const ReactS3Client = new S3(config)

export function uploadImage(file) {
    ReactS3Client.uploadFile(file)
    .then((response) => {
        console.log('Success:', response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

export function deleteImage(){
    ReactS3Client.deleteFile()
    .then((response) => {
        console.log('Success:', response);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

