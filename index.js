import registerRootComponent from 'expo/build/launch/registerRootComponent'
import axios from 'axios'
import {Util} from './util/util'
import {getStringData} from './helpers/local-storage'
import App from './App'

axios.defaults.baseURL = Util.BASE_URL
axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(request => {
  const access_token = getStringData(Util.ACCESS_TOKEN)
  request.headers['Authorization'] = `Bearer ${access_token}`
  return request
}, error => {
  console.error(error)
  return Promise.reject(error)
})

// axios.interceptors.response.use(response => {
//   console.log(response)
//   return response
// }, error => {
//   console.error(error)
//   return Promise.reject(error)
// })

registerRootComponent(App)
