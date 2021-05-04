import React, {useContext, useEffect, useRef} from 'react'
import {Platform} from 'react-native'
import ExpoConstants from 'expo-constants'
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  AndroidNotificationVisibility,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  removeNotificationSubscription,
  requestPermissionsAsync,
  setNotificationChannelAsync,
  setNotificationHandler
} from 'expo-notifications'
import {AppContext} from '../../global/app-context'
import {storeStringData} from '../../helpers/local-storage-helpers'
import Constants from '../../shared/constants'
import Colors from '../../shared/colors'
import {Util} from '../../util/util'

const ExpoPushNotifications = () => {
  // noinspection JSCheckFunctionSignatures
  const appContext = useContext(AppContext)

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      await appContext.SetExpoPushToken(token)
      await storeStringData(Util.EXPO_PUSH_TOKEN, token)
    })

    // noinspection JSValidateTypes, JSUnusedLocalSymbols
    notificationListener.current = addNotificationReceivedListener(notification => {
      // This listener is fired whenever a notification is received while the app is foregrounded
    })

    // noinspection JSValidateTypes, JSUnusedLocalSymbols
    responseListener.current = addNotificationResponseReceivedListener(response => {
      // This listener is fired whenever a user taps on or interacts with a notification (works when app is
      // foregrounded, backgrounded, or killed)
      // response.notification.request.content.data.data
    })

    return () => {
      // noinspection JSCheckFunctionSignatures
      removeNotificationSubscription(notificationListener)
      // noinspection JSCheckFunctionSignatures
      removeNotificationSubscription(responseListener)
    }
  }, [])

  return (<></>)
}

// noinspection JSCheckFunctionSignatures
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
      console.log(Constants.EXPO_PUSH_NOTIFICATION_TOKEN_ERROR)
      return
    }
    token = (await getExpoPushTokenAsync()).data
  } else {
    console.log(Constants.EXPO_PUSH_NOTIFICATION_DEVICE_ERROR)
  }

  if (Platform.OS === 'android') {
    await setNotificationChannelAsync(
      'default',
      {
        name: 'default',
        importance: AndroidImportance.MAX,
        bypassDnd: false,
        description: 'Viralpool',
        lightColor: Colors.primaryColor,
        lockscreenVisibility: AndroidNotificationVisibility.PUBLIC,
        showBadge: true,
        sound: 'default',
        vibrationPattern: [0, 250, 250, 250],
        enableLights: true,
        enableVibrate: true
      })
  }

  return token
}

export default ExpoPushNotifications
