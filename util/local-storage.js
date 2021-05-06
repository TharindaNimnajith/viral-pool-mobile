import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log(error)
  }
}

export const getStringData = async key => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value != null ? value : null
  } catch (error) {
    console.log(error)
  }
}