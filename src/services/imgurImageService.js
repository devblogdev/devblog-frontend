const BASEURL = "https://api.imgur.com/3/image";
const config = {
  headers: {
    Authorization: "Bearer " + process.env.REACT_APP_IMGUR_ACCESS_TOKEN,
  },
};

const imgurUpload = async (file, album = null) => {};

const imgurDelete = async () => {};
