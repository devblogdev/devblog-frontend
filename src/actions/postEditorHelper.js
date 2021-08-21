

// let pattern2= \[(.*?)\]
// let pattern2= \>(.*?)\<
// let pattern 3= /(?<=a).*(?=b)/g

// RETRIEVE THE FIRST MATCH BETWEEEN ">" AND "<":   /(?<=a).*?(?=b)/g
// const regexTitle = /(?<=a).*?(?=b)/g
// Return the string from the first HTML tag found on the string

// let data = "<h1>SellBy Online Store</h1><p>During my second milestone project at Flatiron’s software engineering program I took the challenge of building an online store from scratch. I had some general ideas on how to get started from doing the Sinatra labs, but I decided not to read or watch any tutorials on the topic, just to see how far I could get. In this article I would like to share the most relevant moments in my journey of building my online store app, <strong><em>SellBy</em></strong>, using Sinatra and the MVC framework in Ruby.</p><p>Let&#x27;s get started. </p>"
// export function extractTitle(data) {
//     // This regular expression causes errors in Safari browser
//     let result = data.match(/(?<=>).*?(?=<)/g);
//     console.log(result);
//     return result
// }

// let alternative = /(?:\/)([^#]+)(?=#*)/
export function extractTitle(data) {
    // This regular expression causes errors in Safari browser
    let result = data.match(/(?:>).*?(?=<)/g);
    console.log(result);
    return result
}







