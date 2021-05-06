import registerRootComponent from 'expo/build/launch/registerRootComponent'
import axios from 'axios'
import {ApiUrl} from './util/api-url'
import Constants from './util/constants'
import {getStringData} from './util/local-storage'
import App from './App'

axios.defaults.baseURL = ApiUrl.BASE_URL

axios.interceptors.request.use(async request => {
  const accessToken = await getStringData(Constants.ACCESS_TOKEN)
  request.headers['Authorization'] = `Bearer ${accessToken}`
  request.headers[Constants.CLIENT_ID] = Constants.CLIENT_ID_VALUE
  return request
}, error => {
  console.log(error)
  return Promise.reject(error)
})

registerRootComponent(App)
