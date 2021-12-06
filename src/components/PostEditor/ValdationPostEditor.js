export const noTitle = (data, postExtraction) => {
    return data.slice(0,3) !== "<h1" || postExtraction[0] === ">"
}

export const noBody = (postExtraction) => {
     return postExtraction[1] === ">" || postExtraction[1] === undefined
}