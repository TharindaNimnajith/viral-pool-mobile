import {Platform} from 'react-native'
import ExpoConstants from 'expo-constants'
import {
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  requestPermissionsAsync,
  setNotificationChannelAsync
} from 'expo-notifications'
import {showAlert} from './helpers'
import Constants from '../const/constants'
import Colors from '../const/colors'

export async function registerForPushNotificationsAsync() {
  let token

  if (ExpoConstants.isDevice) {
    const {
      status: existingStatus
    } = await getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const {
        status
      } = await requestPermissionsAsync()
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      await showAlert(Constants.ERROR, Constants.EXPO_PUSH_NOTIFICATION_TOKEN_ERROR)
      return
    }
    token = (await getExpoPushTokenAsync()).data
  } else {
    await showAlert(Constants.ERROR, Constants.EXPO_PUSH_NOTIFICATION_DEVICE_ERROR)
  }

  if (Platform.OS === 'android') {
    await setNotificationChannelAsync('default', {
      name: 'default',
      importance: AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: Colors.primaryColor
    })
  }

  return token
}
