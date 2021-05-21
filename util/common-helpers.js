import {Alert} from 'react-native'
import Constants from './constants'

const warnings = [
  Constants.WARNING_1,
  Constants.WARNING_2,
  Constants.WARNING_3,
  Constants.WARNING_4,
  Constants.WARNING_5
]

const isEmpty = async value => {
  return value === '' || value === null || value === undefined || value === 'null' || value === 'undefined'
}

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
  warnings,
  isEmpty,
  showAlert
}
