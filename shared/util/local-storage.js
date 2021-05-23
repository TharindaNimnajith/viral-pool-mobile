import AsyncStorage from '@react-native-async-storage/async-storage'
import {showAlert} from './helpers'
import Constants from '../const/constants'

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
    return await AsyncStorage.getItem(key)
  } catch (error) {
    await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    console.log(error)
  }
}
