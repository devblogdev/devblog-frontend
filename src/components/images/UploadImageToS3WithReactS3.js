import React, {useState} from 'react';
// import {uploadFile} from 'react-aws-s3'
import S3 from 'react-aws-s3'
import Button from '@material-ui/core/Button';

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}

const UploadImageToS3WithReactS3 = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
        // if (event.target.files && event.target.files[0])
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
	const handleSubmission = async (file) => {
        // uploadFile(file, config)
        const ReactS3Client = new S3(config)
        ReactS3Client.uploadFile(file)
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
	};

	return(
        <div>
            <label htmlFor="btn-upload">
                <input 
                    style={{ display: 'none' }}
                    id="btn-upload"
                    type="file" 
                    name="btn-upload" 
                    onChange={changeHandler} 
                    accept="image/*"
                />
                 <Button color="secondary" variant="contained" component="span">
                    Upload a cover image
                 </Button>
            </label>
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile?.name}</p>
					<p>Filetype: {selectedFile?.type}</p>
					<p>Size in bytes: {selectedFile?.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile?.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={() => handleSubmission(selectedFile)}>Submit</button>
			</div>
		</div>
	)
}

export default UploadImageToS3WithReactS3