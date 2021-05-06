import {Alert} from 'react-native'

const isEmpty = async value => {
  return value === '' || value === null || value === undefined || value === 'null' || value === 'undefined'
}

const showAlert = (title, message) => {
  Alert.alert(
    title,
    message,
    [{
      text: 'OK'
    }]
  )
}

export {
  isEmpty,
  showAlert
}
