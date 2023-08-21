import axios from 'axios';
const { BASE_URL } = process.env

const instance = axios.create({
    baseURL: BASE_URL
});

export default instance;