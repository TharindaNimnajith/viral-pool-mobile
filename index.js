import registerRootComponent from 'expo/build/launch/registerRootComponent'
import axios from 'axios'
import {ApiUrl} from './shared/util/helpers'
import Constants from './shared/const/constants'
import {getStringData, storeStringData} from './shared/util/local-storage'
import App from './App'

axios.defaults.baseURL = ApiUrl.BASE_URL

axios.interceptors.request.use(async request => {
  const accessToken = await getStringData(Constants.ACCESS_TOKEN)
  request.headers['Authorization'] = `Bearer ${accessToken}`
  request.headers[Constants.CLIENT_ID] = Constants.CLIENT_ID_VALUE
  return request
}, async error => {
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(async response => {
  return response
}, async function (error) {
  const originalRequest = error.config
  if (error.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true
    const accessToken = await getStringData(Constants.ACCESS_TOKEN)
    const refreshToken = await getStringData(Constants.REFRESH_TOKEN)
    const data = {
      accessToken,
      refreshToken
    }
    axios.post('oauth/refresh-token', data).then(async response => {
      await storeStringData(Constants.ACCESS_TOKEN, response.data.access_token)
      await storeStringData(Constants.REFRESH_TOKEN, response.data.refresh_token)
    }).catch(async error => {
      console.log(error)
    })
    return axios(originalRequest)
  }
  console.log(error)
  return Promise.reject(error)
})

registerRootComponent(App)
