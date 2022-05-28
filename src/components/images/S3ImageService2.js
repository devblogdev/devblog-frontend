import React, { useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { RemoveImageButton } from '../decorators/Buttons'
import { ModalContext } from '../modal/ModalContext';

// Functional component; utilizes Amazon Web Services S3 for storing images
const S3ImageService2 = ({ retrieveImageState, user, ...props}) => {

	const [selectedFile, setSelectedFile] = useState(null);
	const [isFilePicked, setIsFilePicked] = useState(false)

    const { retrieveModalState } = useContext(ModalContext)

    useEffect(() => {
        if (props.match.url !== "/profile/drafts/new") {
            if (user.posts) {
                const post = user.posts.find( post => `${post.id}` === props.match.params.postID)
                if (post.images[0]) {
                // if (post?.images[0]) {
                    // If the post editor is being loaded with a draft or a post, 
                    // and if the draft or post contains a cover image,
                    // load the image file ('setSelectedFile'), 
                    // pass the file to the post editor ('retrieveImageState'),
                    // and display the image file info ('setIsFilePicked')
                    setSelectedFile(post.images[0])
                    retrieveImageState(post.images[0])
                    setIsFilePicked(true)
                }
            }
        }
    },[retrieveImageState, props.match, user.posts])

    const reset = () => {
        setSelectedFile()
        setIsFilePicked(false)
        retrieveImageState()
    }
    
	const changeHandler = (event) => {
        const file = event.target.files[0]
        if (file) {
            if (file.size > 15000000) return retrieveModalState(["Max file size is 1.5 MB"])
            setSelectedFile(event.target.files[0]);
            setIsFilePicked(true);
            retrieveImageState(event.target.files[0])
        }
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
                    <p>Size: { `${selectedFile.size/1000000}`.slice(0,4) } MB</p>
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

export default S3ImageService2