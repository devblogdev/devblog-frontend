import React, {useState, useRef} from 'react';
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

const S3ImageService = (props) => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

    const ref = useRef()

    const reset = () => {
        setSelectedFile()
        setIsFilePicked(false)
    }

	const changeHandler = (event) => {
        // if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
            props.retrieveImageState(selectedFile)
            console.log(props.retrieveImageState(selectedFile))
            // debugger
        // }
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
                  <Button 
                    color="secondary" variant="contained" component="span"
                    disableElevation
                  >Upload a cover image
                  </Button> 
            </label>
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
                    <RemoveImageButton 
                        onClick={() => reset()}
                        color="primary" variant="contained" component="span"
                        disableElevation
                    >Remove image
                    </RemoveImageButton>
                    {/* <div>
				        <button onClick={() => handleSubmission(selectedFile)}>Submit</button>
			        </div> */}
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
		
		</div>
	)
}

export default S3ImageService