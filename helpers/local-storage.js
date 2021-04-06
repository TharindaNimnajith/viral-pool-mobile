import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeStringData = async (key, value) => {
  try {
    // console.log(key)
    // console.log(value)
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    // saving error
  }
}

const storeObjectData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    // saving error
  }
}

export const getStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (e) {
    // error reading value
  }
}

const getObjectData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
}
