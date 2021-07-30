import React from 'react'


export default function ProfileContainer(props) {
    console.log(props)
    return (
        <div>Welcome to your profile, {props.user.email}</div>
    )
}