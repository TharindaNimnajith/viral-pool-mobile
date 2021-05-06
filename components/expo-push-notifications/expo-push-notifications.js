import React, {useContext, useEffect, useRef} from 'react'
import ExpoConstants from 'expo-constants'
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  removeNotificationSubscription,
  requestPermissionsAsync,
  setNotificationHandler
} from 'expo-notifications'
import {AppContext} from '../../global/app-context'
import Constants from '../../util/constants'
import {showAlert} from '../../util/common-helpers'

const ExpoPushNotifications = () => {
  const appContext = useContext(AppContext)

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      await appContext.SetExpoPushToken(token)
    })

    // noinspection JSUnusedLocalSymbols
    notificationListener.current = addNotificationReceivedListener(notification => {
      //
    })

    // noinspection JSUnusedLocalSymbols
    responseListener.current = addNotificationResponseReceivedListener(response => {
      //
    })

    return () => {
      removeNotificationSubscription(notificationListener)
      removeNotificationSubscription(responseListener)
    }
  }, [])

  return (<></>)
}

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

async function registerForPushNotificationsAsync() {
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
      showAlert(Constants.ERROR, Constants.EXPO_PUSH_NOTIFICATION_TOKEN_ERROR)
      return
    }
    token = (await getExpoPushTokenAsync()).data
  } else {
    showAlert(Constants.ERROR, Constants.EXPO_PUSH_NOTIFICATION_DEVICE_ERROR)
  }
  return token
}

export default ExpoPushNotifications
