import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.error(e)
  }
}

// const storeObjectData = async (key, value) => {
//   try {
//     const jsonValue = JSON.stringify(value)
//     await AsyncStorage.setItem(key, jsonValue)
//   } catch (e) {
//     console.error(e)
//   }
// }

export const getStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    if (value !== null) {
      return value
    }
  } catch (e) {
    console.error(e)
  }
}

// const getObjectData = async (key) => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(key)
//     return jsonValue != null ? JSON.parse(jsonValue) : null
//   } catch (e) {
//     console.error(e)
//   }
// }

// removeStringData
// removeObjectData
