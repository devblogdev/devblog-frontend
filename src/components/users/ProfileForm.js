import React, { useState, useCallback } from 'react'
import { makeStyles } from '@material-ui/core/styles';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CustomInputField from '../decorators/CustomInputField'
import ProfileImageService from '../images/ProfileImageService';


const useStyles = makeStyles(theme => ({
    root: {
      display: 'grid',
      gridTemplateAreas: `
                        'contact profileImage'
                        'about profileImage'
                        'edit edit'
                    `,
      justifyItems: 'center',
      padding: theme.spacing(2),
      border: 'solid 2px',
      borderRadius: '5px',
  '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '300px',
      },
  '& .MuiButtonBase-root': {
        margin: theme.spacing(2),
      },
    },
  }));

export default function ProfileForm(props) {

    const classes = useStyles();

    // const [formButton, setFormButton] = useState('Edit')
    // const [about, setAbout] = useState("")
    // const [profileImage, setProfileImage] = useState({})

    const [imageState, setImageState] = useState()

    const retrieveImageState = useCallback ((file) => {
        setImageState(file)
    },[])

    const handleClick = () => {
        return imageState
    }

    return(
        <div 
            style = {{
                maxWidth: '736px',
                margin: 'auto',
            }}
        >       * This tab is currently in progress; info is not yet saved
            <div className={classes.root}>
                {/* <input style={textInputStyles()} size='25'></input> */}
                {/* <textarea style={textInputStyles()}></textarea> */}
                <CustomInputField name="contact" label="Contact" gridArea="contact" />
                <CustomInputField name="about" label="About" gridArea='about' textArea={true} />
                {/* <CustomInputField name="profileImage" label="Profile Image" /> */}
                {/* <ProfileImage imgSource={null} first_name={props.user.first_name} last_name={props.user.last_name} /> */}
                <div style={{gridArea: "profileImage"}}>
                    <ProfileImageService user = {props.user} retrieveImageState = {retrieveImageState} />
                </div>
                {/* <TextField name="about" variant="outlined" required multiline rows={3} /> */}
                {/* <TextField label="Last Name" variant="outlined" required /> */}
                {/* <TextField label="Email" variant="outlined" type="email" required /> */}
                {/* <TextField label="Password" variant="outlined" type="password" required /> */}
                <div style={{ gridArea: "edit"}}>
                    <Button type="submit" variant="contained" color="primary" onClick={handleClick} >
                    Edit
                    </Button>
                </div>
            </div>
       </div>
    )
}