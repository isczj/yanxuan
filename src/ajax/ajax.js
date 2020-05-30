import axios from 'axios'
const ajax1 = axios.create({
    baseURL:'/topic/v1',
    timeOut:2000
})

ajax1.interceptors.request.use(config=>{
    return config
})
ajax1.interceptors.response.use(response=>{
    return response.data
})
export default ajax1