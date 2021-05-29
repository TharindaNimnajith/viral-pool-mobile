import {Alert} from 'react-native'
import Constants from '../const/constants'

class ApiUrl {
  static ROOT_URL = 'https://vp-base-api.herokuapp.com/'
  static BASE_URL = `${this.ROOT_URL}api/`
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

const showErrors = async error => {
  if (error != null) {
    if (Array.isArray(error.errors))
      await showAlert(Constants.ERROR, error.errors[0])
    else if (error.title == null)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    else
      await showAlert(Constants.ERROR, error.title)
  }
}

const formatNumber = number => {
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const isNullAsync = async value => {
  return await value === null || value === undefined || value === 'null' || value === 'undefined'
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
  showErrors,
  formatNumber,
  isNullAsync,
  isNull
}
