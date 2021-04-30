import React, {useContext, useEffect, useRef} from 'react'
import {LogBox, Platform} from 'react-native'
import ExpoConstants from 'expo-constants'
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  AndroidImportance,
  getExpoPushTokenAsync,
  getPermissionsAsync,
  removeNotificationSubscription,
  requestPermissionsAsync,
  setNotificationChannelAsync,
  setNotificationHandler
} from 'expo-notifications'
import {AppContext} from './global/app-context'
import {GlobalState} from './global/global-state'
import {storeStringData} from './helpers/local-storage-helpers'
import NavigationBar from './components/navigation/navigation-bar'
import Constants from './shared/constants'
import Colors from './shared/colors'
import {Util} from './util/util'

// noinspection JSCheckFunctionSignatures
setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
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
      alert('Failed to get push token for expo push notification.')
      return
    }
    token = (await getExpoPushTokenAsync()).data
  } else {
    alert('Must use physical device for expo push notifications.')
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

const App = () => {
  const patterns = [
    Constants.WARNING_1,
    Constants.WARNING_2,
    Constants.WARNING_3,
    'Animated: `useNativeDriver`'
  ]

  LogBox.ignoreLogs(patterns)

  // noinspection JSCheckFunctionSignatures
  const appContext = useContext(AppContext)

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      await storeStringData(Util.EXPO_PUSH_TOKEN, token)
      // The following function call is not working
      // Therefore, Expo Push Notification Token is not stored in AppContext
      await appContext.SetExpoPushToken(token)
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

  return (
    <GlobalState>
      <NavigationBar/>
    </GlobalState>
  )
}

export default App
