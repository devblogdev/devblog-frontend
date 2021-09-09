import React, { useEffect, useContext } from 'react';
// import { useSelector } from 'react-redux'
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { purple } from '@material-ui/core/colors';
import ProfileImage from '../decorators/ProfileImage';
import { ActivationContext } from '../users/ActivationContext';


const RemoveImageButton = withStyles((theme) => ({
    root: {
      backgroundColor: purple[600],
      '&:hover': {
        backgroundColor: purple[800],
      },
    },
  }))(Button);


export default function ProfileImageService({retrieveImageState, user, showSaveButton, ...props}) {

	// const [selectedFile, setSelectedFile] = useState(null);
	// const [isFilePicked, setIsFilePicked] = useState(false)
    // const [preview, setPreview] = useState()
    // const profileImages = useSelector((state) => state.images.profileImages)
    
    const { preview, setPreview, isFilePicked, setIsFilePicked } = useContext(ActivationContext)
    

    useEffect(() => {
        console.log("rerender")
        if (Object.keys(user) !== []) {
            const userImage = user.images[0]
            if (userImage) {
                // setSelectedFile(userImage)
                retrieveImageState(userImage)
                setIsFilePicked(true)
                console.log("called image service effect")
                setPreview(userImage.url)
            }
        }
    },[retrieveImageState, user, setPreview, setIsFilePicked])

    const reset = () => {
        // setSelectedFile()
        setIsFilePicked(false)
        retrieveImageState()
        setPreview()
    }
    
	const changeHandler = (event) => {
        if (event.target.files[0]) {
            // setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
            retrieveImageState(event.target.files[0]) 
            setPreview(URL.createObjectURL(event.target.files[0]))
        }
	};

    
	return(
        <div>
			{isFilePicked ? (
				<div>
                    <ProfileImage imgSource={preview} first_name={user.first_name} last_name={user.last_name} background="#bdbdbd" />
					 {/* Filename: {selectedFile.name} */}
                    <RemoveImageButton 
                        onClick={() => reset()}
                        color="primary" variant="contained" component="span"
                        disableElevation
                        size="small"
                        disabled={!showSaveButton}
                        style={{ marginBottom: '0px'}}
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
                    disabled={!showSaveButton}
                />
                  <Button 
                    color="secondary" variant="contained" component="span"
                    disableElevation
                    disabled={!showSaveButton}
                  >Upload a profile image
                  </Button> 
            </label>
		</div>
	)
}

