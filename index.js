import registerRootComponent from 'expo/build/launch/registerRootComponent'
import axios from 'axios'
import {ApiUrl} from './util/api-url'
import {Const} from './util/const'
import {getStringData} from './helpers/local-storage-helpers'
import App from './App'

axios.defaults.baseURL = ApiUrl.BASE_URL

// axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(async request => {
  const accessToken = await getStringData(Const.ACCESS_TOKEN)
  request.headers['Authorization'] = `Bearer ${accessToken}`
  request.headers['client_id'] = 'UFwv4s5sAHYyRS2q'
  // console.log(request)
  return request
}, error => {
  console.log(error)
  return Promise.reject(error)
})

// axios.interceptors.response.use(response => {
//   return response
// }, error => {
//   console.log(error)
//   return Promise.reject(error)
// })

registerRootComponent(App)
