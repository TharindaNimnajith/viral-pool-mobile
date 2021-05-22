import {Alert} from 'react-native'
import Constants from './constants'

class ApiUrl {
  static BASE_URL = 'https://cube360viralpoolapi.herokuapp.com/api/'
}

const warnings = [
  Constants.WARNING_1,
  Constants.WARNING_2,
  Constants.WARNING_3,
  Constants.WARNING_4,
  Constants.WARNING_5
]

const genderOptions = [{
  label: 'Female',
  value: 0
}, {
  label: 'Male',
  value: 1
}]

const showAlert = async (title, message) => {
  Alert.alert(
    title,
    message,
    [{
      text: 'OK'
    }]
  )
}

export {
  ApiUrl,
  warnings,
  genderOptions,
  showAlert
}
