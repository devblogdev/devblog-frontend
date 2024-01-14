import axios from "axios";

const BASEURL = "https://api.imgur.com/3/image";
const config = {
  headers: {
    Authorization: "Bearer " + process.env.REACT_APP_IMGUR_ACCESS_TOKEN,
  },
};

const imgurUpload = async (file, album = null) => {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_IMGUR_ACCESS_TOKEN,
      },
    };
    if (file.size > 1500000)
      return reject(retrieveModalState(["Max file size is 1.5 MB"]));
    axios
      .post("https://api.imgur.com/3/image", file, config)
      .then((res) => {
        const source = res.data.data.link + "-" + res.data.data.deletehash;
        dispatch({ type: "REGISTER_NEW_IMAGE", payload: source });
        resolve({ data: { link: source } });
      })
      .catch((error) => {
        console.log(error);
        reject();
      });
  });
};

const imgurDelete = async () => {};
