// @ts-nocheck
import Axios from 'axios'
import Qs from 'qs'
import { showMessage } from '../utils'
import { showLoading } from '@/utils/loading'
function axiosErrorInterceptors(instance) {
  instance.interceptors.response.use(
    response => {
      return response
    },
    error => {
      const errMessageMap = {
        403: '请求被拒绝，请联系客服处理',
        404: '您访问的资源不可用，请联系客服处理',
        502: '服务器网关出错，请稍后重试',
        503: '服务器维护中，请稍后重试',
        504: '服务器请求超时，请稍后重试',
      }
      let errmsg = ''
      if (error && error.response && error.response.status) {
        if (errMessageMap[error.response?.status]) {
          errmsg = `${errMessageMap[error.response.status]}（${error.response.status}）`
        } else {
          errmsg = `请求失败，请稍后重试（${error.response.status}）`
        }
      } else if (error && error.message && /timeout/i.test(error.message)) {
        // axios请求超时 是否含有超时timeout字符串
        errmsg = '请求超时，请稍后重试'
      } else {
        errmsg = '请求失败，请稍后重试'
      }
      return Promise.reject(new Error(errmsg))
    }
  )
}

export default function request(url, data, { method = '', timeout = 8000, requestHeader = null }) {
  const defaultMethod = data ? 'post' : 'get'
  const options = {
    method: method ? method : defaultMethod,
    url: url,
    data,
    timeout: timeout,
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    transformRequest: [
      function (data) {
        if (data instanceof FormData) return data
        return Qs.stringify(data)
      },
    ],
  }
  if (requestHeader) {
    for (const key in requestHeader) {
      options.headers[key] = requestHeader[key]
    }
  }
  return new Promise((resolve, reject) => {
    const instance = Axios.create()
    axiosErrorInterceptors(instance)
    instance(options)
      .then(res => {
        if (res.ret) {
          return Promise.reject(res)
        }
        resolve(res.data)
      })
      .catch(e => {
        console.log('e', e)
        showMessage(e.message)
        reject(e.message)
      })
  })
}
