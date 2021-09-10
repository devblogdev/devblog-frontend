import React from "react";

export default function AuthorBio({author, criteria}) {
    return(
        <React.Fragment>
            {
                criteria === "about" ? (
                    <p>{author?.bio.about}</p>
                ) : (
                    <p>{author?.bio.contact}</p>  
                )
            
            }
        </React.Fragment>
    )
}