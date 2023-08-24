import axios from 'axios';
const { BASE_URL } = process.env



const instance = axios.create({
    baseURL: 'http://localhost:3001'
});


export default instance;