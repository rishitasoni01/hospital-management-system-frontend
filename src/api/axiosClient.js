import React from 'react'
import axios from 'axios';

const axiosClient = axios.create({
    //baseURL: 'http://localhost:8080',
    baseURL: 'https://hospital-management-system-rypp.onrender.com',
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosClient.interceptors.response.use(
    (response) => response.data, (error) => {
        console.error('API Error:', error.response || error.message);
        return Promise.reject(error);


    }
);



export default axiosClient;
