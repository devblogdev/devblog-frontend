import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authorization } from '../actions/securityActions'

export default function ProfileContainer(props) {
    const dispatch = useDispatch()
    useEffect(() => {
        console.log("my profile effect")
        dispatch(authorization())
    },[dispatch])
    return (
        <div>Welcome to your profile {props.user.email}</div>
    )
}