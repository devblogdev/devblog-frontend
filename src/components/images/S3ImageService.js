import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';

const RemoveImageButton = withStyles((theme) => ({
    root: {
      backgroundColor: purple[600],
      '&:hover': {
        backgroundColor: purple[800],
      },
    },
  }))(Button);

// Functional component; utilizes Amazon Web Services S3 for storing images

const S3ImageService = ({initialImageState, retrieveImageState}) => {
    
	const [selectedFile, setSelectedFile] = useState(initialImageState);
	const [isFilePicked, setIsFilePicked] = useState(() => {
        if (initialImageState) {
            return true
        } return false
    });

    useEffect(() => {
      retrieveImageState(initialImageState)
    },[retrieveImageState, initialImageState])

    // console.log(selectedFile)
    
    const reset = () => {
        setSelectedFile()
        setIsFilePicked(false)
        retrieveImageState()
    }
    
	const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setIsFilePicked(true);
        retrieveImageState(event.target.files[0])
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
                  <Button 
                    color="secondary" variant="contained" component="span"
                    disableElevation
                  >Upload a cover image
                  </Button> 
            </label>
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
                    <p>Size in bytes: {selectedFile.size}</p>
					{/* <p>Filetype: {selectedFile.type}</p> */}
					{/* <p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate?.toLocaleDateString()}
					</p> */}
                    <RemoveImageButton 
                        onClick={() => reset()}
                        color="primary" variant="contained" component="span"
                        disableElevation
                        size="small"
                    >Remove image
                    </RemoveImageButton>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
		
		</div>
	)
}

export default S3ImageService