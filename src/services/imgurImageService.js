import axios from "axios";

const BASEURL = "https://api.imgur.com/3/image";
const config = {
  headers: {
    Authorization: "Bearer " + process.env.REACT_APP_IMGUR_ACCESS_TOKEN,
  },
};

export async function imgurRequestAlbums() {
  try {
    const response = await axios.get(`https://api.imgur.com/3/account/${process.env.REACT_APP_IMGUR_USERNAME}/albums`, config)
    const albumIds = {};
    response.data.forEach((album) => {
      albumIds[album.title] = album.id
    })
    return albumIds;
  } catch (error) {
    throw error;
  }
};

export function imgurUploadFile(file, album) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('album', album);
    axios
      .post(BASEURL, formData, config)
      .then((res) => {
        console.log(res)
        return resolve(res.data.data);
      })
      .catch((error) => {
        console.log(error);
        return reject(error);
      });
  });
};

export async function imgurUploadBodyImage(file, album) {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('album', album);
  return axios
    .post(BASEURL, formData, config)
    .then((res) => {
      const source = res.data.data.link + "-" + res.data.data.deletehash;
      console.log("SUCCESSFUL RESPONSE INSIDE IMGUR CALLBACK")
      return { data: { link: source } };
    })
    .catch((error) => {
      console.log(error);
      console.log('RUNNING THE ERROR BLOCK INSIDE IMGUR CALLBACK')
      throw error;
    });
};

export async function imgurDeleteFile(key) {
  return await axios.delete(BASEURL + '/'+ key, config)
};
