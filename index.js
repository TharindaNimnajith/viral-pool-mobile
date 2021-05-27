import registerRootComponent from 'expo/build/launch/registerRootComponent'
import axios from 'axios'
import {ApiUrl} from './shared/util/helpers'
import Constants from './shared/const/constants'
import {getStringData, storeStringData} from './shared/util/local-storage'
import App from './App'

axios.defaults.baseURL = ApiUrl.BASE_URL

axios.interceptors.request.use(async request => {
  const accessToken = await getStringData(Constants.ACCESS_TOKEN)
  request.headers[Constants.AUTHORIZATION] = `${Constants.BEARER} ${accessToken}`
  request.headers[Constants.CLIENT_ID] = Constants.CLIENT_ID_VALUE
  return request
}, async error => {
  console.log(error)
  return Promise.reject(error)
})

axios.interceptors.response.use(async response => {
  return response
}, async error => {
  console.log(error)
  if (error.response.status !== 401) {
    return new Promise((resolve, reject) => {
      reject(error)
    })
  }
  const accessToken = await getStringData(Constants.ACCESS_TOKEN)
  const refreshToken = await getStringData(Constants.REFRESH_TOKEN)
  const data = {
    accessToken,
    refreshToken
  }
  return await axios.post('oauth/refresh-token', data).then(async response => {
    await storeStringData(Constants.ACCESS_TOKEN, response.data.access_token)
    await storeStringData(Constants.REFRESH_TOKEN, response.data.refresh_token)
    error.config.headers[Constants.AUTHORIZATION] = `${Constants.BEARER} ${response.data.access_token}`
    return new Promise((resolve, reject) => {
      axios.request(error.config).then(response => {
        resolve(response)
      }).catch(error => {
        error.response.status = 403
        reject(error)
      })
    })
  }).catch(error => {
    Promise.reject(error)
  })
})

registerRootComponent(App)
