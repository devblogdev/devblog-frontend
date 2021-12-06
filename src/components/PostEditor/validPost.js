export const noTitle = (data, postExtraction) => {
    // if the first three characters in the post are not "<h1" or there is no content after the closing character ">",
    // it means that there is not an h1 tag present or the first line of the post is empty; return true, no title
    return data.slice(0,3) !== "<h1" || postExtraction[0] === ">"
}

export const noBody = (postExtraction) => {
    // If the second line of he post (after the title line) has no content after the closing character ">"
    // or undefined, return true, the post has no body
     return postExtraction[1] === ">" || postExtraction[1] === undefined
}