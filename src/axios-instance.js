import axios from 'axios';

const axiosInstance = axios.create ( {
    baseURL: "https://rmail-37b76.firebaseio.com/", 
    // baseURL: 'https://jsonplaceholder.typicode.com/',
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;

