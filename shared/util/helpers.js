import {Alert} from 'react-native'
import Constants from '../const/constants'

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

const tabs = [{
  key: 'personalDetails',
  title: 'Personal Details',
  iconFocused: 'person',
  icon: 'person-outline'
}, {
  key: 'paymentDetails',
  title: 'Payment Details',
  iconFocused: 'card',
  icon: 'card-outline'
}]

const showAlert = async (title, message) => {
  Alert.alert(title, message, [{
    text: 'OK'
  }], {
    cancelable: true
  })
}

const isNullAsync = async value => {
  return value === null || value === undefined || value === 'null' || value === 'undefined'
}

const isNull = value => {
  return value === null || value === undefined || value === 'null' || value === 'undefined'
}

export {
  ApiUrl,
  warnings,
  genderOptions,
  tabs,
  showAlert,
  isNullAsync,
  isNull
}
