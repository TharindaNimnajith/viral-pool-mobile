import registerRootComponent from 'expo/build/launch/registerRootComponent'
// import {useContext} from 'react'
import axios from 'axios'
// import {AppContext} from './global/app-context'
import {Util} from './util/util'
import {getStringData} from './helpers/local-storage-helpers'
import App from './App'

// const accessToken = getStringData(Util.ACCESS_TOKEN)

axios.defaults.baseURL = Util.BASE_URL

// axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN'
// axios.defaults.headers.post['Content-Type'] = 'application/json'

axios.interceptors.request.use(async request => {
  // const appContext = useContext(AppContext)
  // const accessToken = appContext.accessToken
  const accessToken = await getStringData(Util.ACCESS_TOKEN)
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
