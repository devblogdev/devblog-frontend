// let pattern2= \[(.*?)\]
// let pattern2= \>(.*?)\<
// let pattern 3= /(?<=a).*(?=b)/g

// export function extractTitle(data) {
//     // This regular expression causes errors in Safari browser
//     let result = data.match(/(?<=>).*?(?=<)/g);
//     console.log(result);
//     return result
// }

export function extractTitle(data) {
    // Regular expression below retrieves the contents found between ">" and "<" characters for HTML strings
    // Example: "<h1>My Post</h1><p>Post body...</p>"
    // result --> [">My Post", ">Post body..."]
    let result = data.match(/(?:>).*?(?=<)/g);
    // console.log(result);
    return result
}







