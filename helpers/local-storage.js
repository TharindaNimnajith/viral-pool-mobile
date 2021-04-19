import AsyncStorage from '@react-native-async-storage/async-storage'

export const storeStringData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log(error)
  }
}

// const storeObjectData = async (key, value) => {
//   try {
//     await AsyncStorage.setItem(key, JSON.stringify(value))
//   } catch (error) {
//     console.log(error)
//   }
// }

export const getStringData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key)
    return value != null ? value : null
  } catch (error) {
    console.log(error)
  }
}

// const getObjectData = async (key) => {
//   try {
//     const jsonValue = await AsyncStorage.getItem(key)
//     return jsonValue != null ? JSON.parse(jsonValue) : null
//   } catch (error) {
//     console.log(error)
//   }
// }

// removeStringData

// removeObjectData
