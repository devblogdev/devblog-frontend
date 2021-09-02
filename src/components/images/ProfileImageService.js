import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import ProfileImage from '../decorators/ProfileImage';

const RemoveImageButton = withStyles((theme) => ({
    root: {
      backgroundColor: purple[600],
      '&:hover': {
        backgroundColor: purple[800],
      },
    },
  }))(Button);


// Functional component; utilizes Amazon Web Services S3 for storing images
const ProfileImageService = ({retrieveImageState, user, ...props}) => {

	const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false)
    const [preview, setPreview] = useState()

    useEffect(() => {
        if (Object.keys(user) !== []) {
            if (user.last_name) {
                // If the post editor is being loaded with a draft or a post, 
                // and if the draft or post contains an image,
                // load the image file ('setSelectedFile'), 
                // pass the file to the post editor ('retrieveImageState'),
                // display the image file info ('setIsFilePicked')
                setSelectedFile(user.last_name)
                retrieveImageState(user.last_name)
                setIsFilePicked()
            }
        }
    },[retrieveImageState, props.match, user])

    const reset = () => {
        setSelectedFile()
        setIsFilePicked(false)
        retrieveImageState()
    }
    
	const changeHandler = (event) => {
        if (event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
            retrieveImageState(event.target.files[0])
            setPreview(URL.createObjectURL(event.target.files[0]))
        }
	};

	return(
        <div>
			{isFilePicked ? (
				<div>
                    {/* <div style={{border: 'solid 2px purple'}}> */}
                        {/* <img src={preview} width="200px" alt="" /> */}
                        <ProfileImage imgSource={preview} />
                    {/* </div> */}
					<p>Filename: {selectedFile.name}</p>
                    {/* <p>Size in bytes: {selectedFile.size}</p> */}
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
                <ProfileImage imgSource={null} first_name={user.first_name} last_name={user.last_name} background="#bdbdbd" />
				// <p>Select a file to show details</p>
			)}
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
                  >Upload a profile image
                  </Button> 
            </label>
		</div>
	)
}

export default ProfileImageService