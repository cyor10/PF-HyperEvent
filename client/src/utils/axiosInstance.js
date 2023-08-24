import axios from 'axios';
const { BASE_URL } = process.env



const instance = axios.create({
    baseURL: 'https://hyperevent-be.up.railway.app'
});


export default instance;