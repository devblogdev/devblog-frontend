export default function uploadImageCallback(file) {
    return new Promise((resolve, reject) => {
      const config = {
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_IMGUR_ACCESS_TOKEN
        },
      };
      if (file.size > 1500) return reject(retrieveModalState(['Max file size is 1.5 MB']))
      axios.post("https://api.imgur.com/3/image", file, config).then((res) => {
        console.log(res);
        resolve({ data: { link: res.data.data.link } } )
      }).catch(error => {
        console.log(error)
        reject()
      });
    });
  }

// export function embeddedUrl(url) {
//     // debugger
//     if (url.indexOf("youtube") >= 0) {
//     //   embeddedLink = embeddedLink.replace("watch?v=","embed/");
//     //   embeddedLink = embeddedLink.replace("/watch/", "/embed/");
//     //   embeddedLink = embeddedLink.replace("youtu.be/","youtube.com/embed/");
//     }
// }