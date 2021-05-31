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
import {AppContext} from '../../shared/global/app-context'
import Constants from '../../shared/const/constants'
import {showAlert} from '../../shared/util/helpers'

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

const ExpoPushNotifications = () => {
  const appContext = useContext(AppContext)

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      await appContext.SetExpoPushToken(token)
    }).catch(async error => {
      console.log(error)
    })
    notificationListener.current = addNotificationReceivedListener(async notification => {
      console.log(notification.request.content.data)
      await appContext.SetNewNotifications(true)
    })
    responseListener.current = addNotificationResponseReceivedListener(async response => {
      console.log(response.notification.request.content.data)
      await appContext.SetNewNotifications(true)
    })
    return () => {
      removeNotificationSubscription(notificationListener)
      removeNotificationSubscription(responseListener)
    }
  }, [])

  return (<></>)
}

async function registerForPushNotificationsAsync() {
  let token
  if (ExpoConstants.isDevice) {
    const {
      status: existingStatus
    } = await getPermissionsAsync().catch(async error => {
      console.log(error)
    })
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const {
        status
      } = await requestPermissionsAsync().catch(async error => {
        console.log(error)
      })
      finalStatus = status
    }
    if (finalStatus !== 'granted') {
      await showAlert(Constants.ERROR, Constants.EXPO_PUSH_NOTIFICATION_TOKEN_ERROR)
      return
    }
    token = (await getExpoPushTokenAsync().catch(async error => {
      console.log(error)
    })).data
  } else {
    await showAlert(Constants.ERROR, Constants.EXPO_PUSH_NOTIFICATION_DEVICE_ERROR)
  }
  return token
}

export default ExpoPushNotifications
