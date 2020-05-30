import axios from 'axios'
const ajax = axios.create({
    baseURL:'/mock',
    timeOut:2000
})

ajax.interceptors.request.use(config=>{
    return config
})
ajax.interceptors.response.use(response=>{
    return response.data
})
export default ajax