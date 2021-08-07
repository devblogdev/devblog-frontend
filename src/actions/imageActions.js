import axios from "axios";

const uploadImage = (endpoint, imageData) => {
	axios.post('https://freeimage.host/api/1/upload?key=<YOUR_API_KEY>', {method: 'POST', body: formData} )
    .then((response) => response.json())
    .then((result) => {
        console.log('Success:', result);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}