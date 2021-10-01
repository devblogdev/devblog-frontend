import React, { useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import ProfileImage from '../decorators/ProfileImage';
import { RemoveImageButton } from '../decorators/Buttons';
import { ActivationContext } from '../users/ActivationContext';


export default function ProfileImageService({retrieveImageState, user, showSaveButton, ...props}) {

	// const [selectedFile, setSelectedFile] = useState(null);
	// const [isFilePicked, setIsFilePicked] = useState(false)
    // const [preview, setPreview] = useState()
    
    const { 
        preview, 
        setPreview, 
        isFilePicked, 
        setIsFilePicked,
    } = useContext(ActivationContext)
    

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
        const file = event.target.files[0]
        if (file) {
            // debugger
            // setSelectedFile(event.target.files[0]);
            if (file.size > 1500000) return props.retrieveModalState(["Max file size is 1.5 MB"])
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

