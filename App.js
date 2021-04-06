import React, {useEffect, useRef} from 'react'
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
// import {AppContext} from './global/app-context'
// import {GlobalState} from './global/global-state'
import {storeStringData} from './helpers/local-storage'
import Navigation from './shared/navigation'
import Constants from './shared/constants'
import Colors from './shared/colors'

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

const App = ({navigation}) => {
  // const appContext = useContext(AppContext)

  LogBox.ignoreLogs([Constants.IGNORED_WARNING])

  // const [expoPushToken, setExpoPushToken] = useState('')
  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => storeStringData('@expoPushToken', token))
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
    // registerForPushNotificationsAsync().then(token => appContext.setToken(token))

    // This listener is fired whenever a notification is received while the app is foregrounded
    // noinspection JSValidateTypes
    notificationListener.current = addNotificationReceivedListener(notification => {
      // console.log(notification)
    })

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded,
    // backgrounded, or killed)
    // noinspection JSValidateTypes
    responseListener.current = addNotificationResponseReceivedListener(response => {
      console.log(response.notification.request.content.data.data)
      navigation.navigate(response.notification.request.content.data.data)
    })

    // appContext.setToken(expoPushToken).then(() => {
    // })

    // storeStringData('@expoPushToken', expoPushToken).then(() => {
    // })

    return () => {
      removeNotificationSubscription(notificationListener)
      removeNotificationSubscription(responseListener)
    }
  }, [])

  return (
    // <GlobalState>
    <Navigation/>
    // </GlobalState>
  )
}

export default App
