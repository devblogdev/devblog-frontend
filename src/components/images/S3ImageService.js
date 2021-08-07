import React, {useState, useRef} from 'react';
// import {uploadFile} from 'react-aws-s3'
import S3 from 'react-aws-s3'
import Button from '@material-ui/core/Button';

const config = {
    bucketName: process.env.REACT_APP_S3_BUCKET,
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
}

const S3ImageService = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const ref = useRef()

    const reset = (file) => {
        // console.log(file.value)
        // ref.current.value = null
        setSelectedFile()
        setIsFilePicked(false)
    }

	const changeHandler = (event) => {
        if (event.target.files && event.target.files[0]) {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
        }
	};
	const handleSubmission = async (file) => {
        const ReactS3Client = new S3(config)
        const newFilename = selectedFile.name
        ReactS3Client.uploadFile(file)
            .then((response) => {
                console.log('Success:', response);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        // const filename = selectedFile.name
        // ReactS3Client.deleteFile("2qYYFYzk1focd8LWmAdGq2.png")
        //     .then((response) => {
        //         console.log('Success:', response);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });
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
                    ref = {ref}
                />
                  <Button color="secondary" variant="contained" component="span">Upload a cover image</Button> 
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
                    <Button onClick={() => reset(selectedFile)}>Remove image</Button>
                    <div>
				        <button onClick={() => handleSubmission(selectedFile)}>Submit</button>
			        </div>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
		
		</div>
	)
}

export default S3ImageService