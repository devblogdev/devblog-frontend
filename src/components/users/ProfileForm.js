import React, { useState, useCallback, useContext, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CustomInputField from '../decorators/CustomInputField'
import ProfileImageService from '../images/ProfileImageService';
import { ActivationContext } from './ActivationContext';
import { DangerButton, GreenButton } from '../decorators/Buttons';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../actions/userActions';
import { manageImageForDraftOrPost } from '../../actions/imageActions'


const useStyles = makeStyles(theme => ({
    root: {
      display: 'grid',
      gridTemplateAreas: `
                        'contact profileImage'
                        'about profileImage'
                    `,
      justifyItems: 'center',
      justifyContent: 'space-evenly',
      padding: theme.spacing(2),
  '@media (max-width: 540px)': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
      },
  '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
      },
  '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },
  }));

// ProfileForm is rendered in containers/ProfileContainer.js
// In the UI, the ProfileForm is shown under the "My Info" tab
export default function ProfileForm(props) {

    const classes = useStyles();
    const { user } = props;
    const dispatch = useDispatch();

    // "activate" is used to activate the buttons and the textfields present in the ProfileForm when the user clicks on the "Edit" button
    // "deactivate" is used to deactivate the buttons and the textfields present in the ProfileForm when the user clicks on "Cancel"
        // Both the "activate" and "deactivate" functions set the "active" useState variable in ActivationContext.js
    // The "restoreProfileImage" function is used to undo any changes the user may have made to the profile image in ProfileForm upon clicking on "Cancel"
        // the "restoreProfileImage" function sets the "preview" useState variable in ActivationContext.js
    // The "showProfileImage" function shows the user's profile image if one is present when clicking on "Cnacel"
        // example: the user has a profile image, user clicks on "Edit", then user removes the image; and then clicks on "Cancel"; at this point the original image is restored 
    const { activate, deactivate, restoreProfileImage, showProfileImage } = useContext(ActivationContext);

    const [imageState, setImageState] = useState();

    // This function is passed to the child ProfileImageService component; it stores the user profile image if user has one;
    // the function is called when the ProfileImageService component is rnedered AND the user has an image on record, OR when the 
    // user selects a file for upload
    const retrieveImageState = useCallback ((file) => {
        setImageState(file)
    },[])

    // The "showSaveButton" boolean is used to change the buttons shown to user; if user clicks on "Edit"
    // the "Save" button (component: GreenButton) and the "Cancel" button (component: DangerButton) are shown;
    // if the user clicks on "Save", the "Save" and "Cancel" buttons are hidden
    const [showSaveButton, setShowSaveButton] = useState(false)

    // This is an uncontrolled component; that's why useRef hook is used
    const inputFieldRef = useRef([])
    const publicFields = ['contact', 'about']
    inputFieldRef.current = new Array(publicFields.length)
    // const contact = useRef()
    // const about = useRef()


    const handleEdit = () => {
        setShowSaveButton(true)
        activate()        
    }

    const handleCancel = () => {
        setShowSaveButton(false)
        deactivate()
        // about.current.value = user.bio.about
        publicFields.forEach( (field, index) => {
          inputFieldRef.current[index].value = user.bio[publicFields[index]] || ""
        })
        setImageState(user.images[0])
        restoreProfileImage(user.images[0]?.url)
        user.images[0] && showProfileImage()
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        // 'bio' keys nedd to be organized alphabetically for comparison purposes in 'anyChanges' constant below
        const rawUserData = {
                  bio: {
                    about: event.target.about.value,
                    contact: event.target.contact.value
                  }
                //   For late use
                //   private: {
                //     username: event.target.username.value
                //   }
                }
        const resolveImageThenResolveUser = async () => {
            const imageData = await manageImageForDraftOrPost(user, imageState, true)
            // 'anyChanges' -> Did the user write anything on the textfields compared to what was in the textfields initially?
                        //  -> Did the profile image file change in name or file size?
            const anyChanges = JSON.stringify({bio: user.bio}) !== JSON.stringify(rawUserData) || user.images[0]?.name !== imageData[0]?.name || user.images[0]?.size !== imageData[0]?.size 
            if ( anyChanges ) {
                let userData = Object.assign(rawUserData, {images_attributes: imageData} )
                const endpoint = `users/${user.id}`
                console.log("there was a change")
                dispatch(updateUser(endpoint, userData, props))
                setShowSaveButton(false)
                deactivate()
            }    
            setShowSaveButton(false)
            deactivate()
        }
        resolveImageThenResolveUser()
    }


    
    return(
        <div 
            style = {{
                maxWidth: '736px',
                margin: 'auto',
                border: 'solid 2px',
                borderRadius: '5px',
            }}
        >       
            <form onSubmit={handleSubmit}>
                <div className={classes.root}>
                    <CustomInputField 
                        name="contact" 
                        label="Contact Email" 
                        gridArea="contact" 
                        defaultValue={user.bio.contact}  
                        inputRef={el => inputFieldRef.current[0] = el}
                        // inputRef={contact}
                        maxWidth= '215px'
                    />
                    <CustomInputField 
                        name="about" 
                        label="About" 
                        gridArea='about' 
                        textArea={true} 
                        defaultValue={user.bio.about} 
                        inputRef={el => inputFieldRef.current[1] = el}
                        maxWidth= '256px'
                        // inputRef={about}
                    />
                    {/* <CustomInputField 
                        name="username" 
                        label="Username" 
                        gridArea='username' 
                        defaultValue={user.private.username} 
                        inputRef={el => inputFieldRef.current[2] = el}
                    /> */}
                    <div style={{ gridArea: 'profileImage'}}>
                        <ProfileImageService user = {props.user} retrieveImageState = {retrieveImageState} showSaveButton={showSaveButton} {...props} />
                    </div>
                </div>
                { !showSaveButton ? (
                        <div style={{ display: "flex", justifyContent: 'center', marginBottom: '16px'}}>
                            <Button variant="contained" color="primary" onClick={handleEdit} disableElevation >
                            Edit
                            </Button>
                        </div>
                    ) : (
                        <div style={{ display: "flex", justifyContent: 'center', marginBottom: '16px'}}>
                            <GreenButton type="submit" color="primary" variant="contained" disableElevation style={{marginRight: '8px'}} >
                            Save
                            </GreenButton>
                            <DangerButton variant="contained" onClick={handleCancel} disableElevation >
                            Cancel
                            </DangerButton>
                        </div>
                    )
                }
            </form>
       </div>
    )
}


    // return(
    //     <div 
    //         style = {{
    //             maxWidth: '736px',
    //             margin: 'auto',
    //         }}
    //     >       * This tab is currently in progress; info is not yet saved
    //         <div className={classes.root}>
    //             {/* <input style={textInputStyles()} size='25'></input> */}
    //             {/* <textarea style={textInputStyles()}></textarea> */}
    //             <CustomInputField name="contact" label="Contact" gridArea="contact" />
    //             <CustomInputField name="about" label="About" gridArea='about' textArea={true} />
    //             {/* <CustomInputField name="profileImage" label="Profile Image" /> */}
    //             {/* <ProfileImage imgSource={null} first_name={props.user.first_name} last_name={props.user.last_name} /> */}
    //             <div style={{gridArea: "profileImage"}}>
    //                 <ProfileImageService user = {props.user} retrieveImageState = {retrieveImageState} />
    //             </div>
    //             {/* <TextField name="about" variant="outlined" required multiline rows={3} /> */}
    //             {/* <TextField label="Last Name" variant="outlined" required /> */}
    //             {/* <TextField label="Email" variant="outlined" type="email" required /> */}
    //             {/* <TextField label="Password" variant="outlined" type="password" required /> */}
    //             <div style={{ gridArea: "edit"}}>
    //                 <Button type="submit" variant="contained" color="primary" onClick={handleClick} >
    //                 Edit
    //                 </Button>
    //             </div>
    //         </div>
    //    </div>
    // )