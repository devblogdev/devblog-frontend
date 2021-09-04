import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'
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


export default function ProfileImageService({retrieveImageState, user, ...props}) {

	const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false)
    const [preview, setPreview] = useState()

    const profileImages = useSelector((state) => state.images.profileImages)
    const userImage = profileImages.find( image => image.user_ids[0] === user.id )

    useEffect(() => {
        if (Object.keys(user) !== []) {
            if (userImage) {
                setSelectedFile(userImage)
                retrieveImageState(userImage)
                setIsFilePicked(true)
                setPreview(URL.createObjectURL(userImage))
            }
        }
    },[retrieveImageState, props.match, user, userImage])

    const reset = () => {
        setSelectedFile()
        setIsFilePicked(false)
        retrieveImageState()
        setPreview()
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
                    <ProfileImage imgSource={preview} />
					<p>Filename: {selectedFile.name}</p>
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

