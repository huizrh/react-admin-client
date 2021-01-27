/*发送异步ajax请求的函数模块
封装axios，返回一个Promise对象
*/
import axios from 'axios'

export default function ajax(url, params = {}, type = 'GET') {
    if (type === 'GET') {
        return axios.get(url, { params })
    } else {
        return axios.post(url, params)
    }
}