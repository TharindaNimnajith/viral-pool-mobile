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
import React, {useEffect, useRef, useState} from 'react'
import {Button, Platform, View} from 'react-native'
import Constants from '../../shared/constants'
import Colors from '../../shared/colors'
import Menu from '../../components/menu'
import Logout from '../../components/logout'

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})

const NotificationScreen = () => {
  const [expoPushToken, setExpoPushToken] = useState('')

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token))
    // noinspection JSValidateTypes
    notificationListener.current = addNotificationReceivedListener(() => {
    })
    // noinspection JSValidateTypes
    responseListener.current = addNotificationResponseReceivedListener(() => {
    })
    return () => {
      removeNotificationSubscription(notificationListener)
      removeNotificationSubscription(responseListener)
    }
  }, [])

  return (
    <View>
      <Button title='Press to Send Notification'
              onPress={async () => {
                await sendPushNotification(expoPushToken)
              }}/>
    </View>
  )
}

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Test Title',
    body: 'Test viralpool notification body.',
    data: {
      data: 'test data'
    }
  }
  await fetch(Constants.EXPO_PUSH_NOTIFICATION_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })
}

async function registerForPushNotificationsAsync() {
  let token
  if (ExpoConstants.isDevice) {
    const {status: existingStatus} = await getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== 'granted') {
      const {status} = await requestPermissionsAsync()
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

NotificationScreen.navigationOptions = navData => {
  return {
    headerTitle: 'NOTIFICATIONS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default NotificationScreen
