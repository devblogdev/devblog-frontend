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


// match everything after the termination of the first h1 tag
// Example: "<h1>My Post</h1><p>Post body...</p>"
// result => "<p>Post body...</p>"
export function extractBodySlidingWindow(htmlString) {
    let i = 0;
    let counter = 0;
    const substring = "/h1>";
    while(i < htmlString.length) {
        while(htmlString[i] === substring[counter]) {
            i++;
            counter++;
            if(counter === substring.length) {
                return htmlString.slice(i);
            }
        }
        i++;
        counter = 0;
    }
    return "";
}







