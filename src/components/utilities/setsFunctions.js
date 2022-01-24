// Find the elements in setA that are not in setB
// Are there any elements in SetA that are not in SetB? If so, give me those
// In context: when you open a post in post editor, register the Imgur images in SetA;
// When you leave the post editor or save the post, register the Imgur images in SetB;
// If there are images in SetA that are not in setB, it means that the user deleted those images;
// Grab the urls of those images and send them to backend to schedule them for destruction
export function difference(setA, setB) {
    let _difference = new Set(setA)
    for (let elem of setB) {
        _difference.delete(elem)
    }
    return _difference
}


export function union(setA, setB) {
    let _union = new Set([...setA, ...setB])    
    return _union
}

// export function union(setA, setB) {
//     let _union = new Set(setA)
//     for (let elem of setB) {
//         _union.add(elem)
//     }
//     return _union
// }