export function prepareSnippet(body) {
  let result = body;
  let i = 0;
  let counter = 0;
  const start = "<pre>```";
  const end = "</pre>";
  let use = start;
  let window;
  while (i < result.length) {
    while (result[i] === use[counter]) {
      i++;
      counter++;
      if (counter === use.length) {
        let j = i;
        if (use === start) {
          window = i;
          while (result[j] !== "<") {
            j++;
          }
          //   result =
          //     result.slice(0, i - 3) +
          //     `<code class=language-${result.slice(i, j)}>` +
          //     result.slice(result[j + 1] + result[j + 2] === "br" ? j + 4 : j);
          const userInput = result.slice(i, j).split("+");
          const language = userInput[0];
          const lines = userInput[1] === "lines";
          result =
            result.slice(0, i - 4) +
            `${lines ? " class=line-numbers" : ""}` +
            ">" +
            `<code class=language-${language}>` +
            result.slice(result[j + 1] + result[j + 2] === "br" ? j + 4 : j);
          use = end;
          // i = j-1;
        } else {
          const block = result.slice(window, i - 6).replace(/<br>/g, "\n");
          result =
            result.slice(0, window) + block + "</code>" + result.slice(i - 6);
          use = start;
          i -= i - 6 - window - block.length;
        }
      }
    }
    i++;
    counter = 0;
  }
  return result;

  // @TODO change this function to use Regex instead
  // const beginning = /(<pre>```.*?)</g;
  // const ending = /<\/pre>/g;
  // const newLine = /\n/g;
  // function process(match, p1, p2, offset, string) {
  //     if(p1) {
  //     }
  // }
}
