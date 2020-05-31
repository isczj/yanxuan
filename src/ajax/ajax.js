import axios from 'axios'
const ajax1 = axios.create({
    baseURL: '/topic/v1',
    timeOut: 2000
})

ajax1.interceptors.request.use(config => {
    return config
})
ajax1.interceptors.response.use(response => {
    return response.data
})
const ajax2 = axios.create({
    baseURL: '/xhr',
    timeOut: 2000
})

ajax2.interceptors.request.use(config => {
    return config
})
ajax2.interceptors.response.use(response => {
    return response.data
})
export { ajax1, ajax2 }