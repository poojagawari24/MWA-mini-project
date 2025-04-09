import axios from 'axios'

 const axiosInstance = axios.create({
   // baseURL:import.meta.env.mode === "development"? "http://localhost:5000/api" : "/api",
    baseURL :"http://localhost:3000",
    withCredentials:true,
    
})

export default axiosInstance;