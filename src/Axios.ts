import axios from 'axios'
const request :any = axios.create({
    baseURL: 'http://47.108.254.114:1111',
    timeout: 5000
})


// 添加请求拦截器
request.interceptors.request.use((config:any)=> {
    return config
}, (error:any)=> {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response:any)=> {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error:any)=> {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default request