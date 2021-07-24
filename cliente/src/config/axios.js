/* AXIOS CLIENT */
import axios from 'axios';
/* Function that always calls localhost:4000 to make request to the API */
/* This I use every time DB in the front  */
const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export default axiosClient;