import axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

const accessToken = localStorage.getItem('accessToken');

const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: { Authorization: `Bearer ${accessToken}` },
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
