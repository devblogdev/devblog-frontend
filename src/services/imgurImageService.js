import axios from "axios";

const BASEURL = "https://api.imgur.com/3/upload";
const config = {
  headers: {
    Authorization: "Bearer " + process.env.REACT_APP_IMGUR_ACCESS_TOKEN,
  },
};

const imgurUpload = async (file, album = null) => {
  return new Promise((resolve, reject) => {
    if (file.size > 1500000)
      return reject(retrieveModalState(["Max file size is 1.5 MB"]));
    axios
      .post(BASEURL, file, config)
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
