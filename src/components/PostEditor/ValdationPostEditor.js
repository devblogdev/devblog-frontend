

export const noTitle = (data, postExtraction) => {
    // debugger
    const one = data.slice(0,3) !== "<h1" || postExtraction[0] === ">"
    
    return one
}


export const noBody = (postExtraction) => {
    const two = postExtraction[1] === ">" || postExtraction[1] === undefined
    // debugger
    
    return two
}