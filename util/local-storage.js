import AsyncStorage from '@react-native-async-storage/async-storage'
import {showAlert} from './common-helpers'
import Constants from './constants'

export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    console.log(error)
  }
}

export const getStringData = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value != null ? value : null
  } catch (error) {
    await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    console.log(error)
  }
}
