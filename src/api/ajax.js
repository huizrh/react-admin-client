/*发送异步ajax请求的函数模块
封装axios
为了统一处理异常，在axios的promise外再包一层promise，集中处理异常

*/
import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, params = {}, type = 'GET') {

    return new Promise((resolve, reject) => {
        let axiosPromise
        if (type === 'GET') {
            axiosPromise = axios.get(url, { params })
        } else {
            axiosPromise = axios.post(url, params)
        }
        axiosPromise.then(response => {
            resolve(response.data)
        }).catch(error => {
            message.error('Failed: ' + error.message)
        })
    })

}