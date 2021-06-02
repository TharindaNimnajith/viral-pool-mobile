import React, {useContext, useEffect, useRef} from 'react'
import {
  addNotificationReceivedListener,
  addNotificationResponseReceivedListener,
  removeNotificationSubscription,
  setNotificationHandler
} from 'expo-notifications'
import {registerForPushNotificationsAsync} from '../../../shared/util/expo-token'
import {AppContext} from '../../../shared/global/app-context'
import {isNull} from '../../../shared/util/helpers'
import {storeStringData} from '../../../shared/util/local-storage'
import Constants from '../../../shared/const/constants'
import NavigationBar from '../navigation-bar/navigation-bar'

setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true
  })
})

const AppContainer = () => {
  const appContext = useContext(AppContext)

  const notificationListener = useRef()
  const responseListener = useRef()

  useEffect(() => {
    registerForPushNotificationsAsync().then(async token => {
      if (!isNull(token))
        await storeStringData(Constants.EXPO_TOKEN, token)
    })
    notificationListener.current = addNotificationReceivedListener(async () => {
      await appContext.SetNewNotifications(true)
    })
    responseListener.current = addNotificationResponseReceivedListener(async () => {
      await appContext.SetNewNotifications(true)
    })
    return () => {
      removeNotificationSubscription(notificationListener.current)
      removeNotificationSubscription(responseListener.current)
    }
  }, [])

  return (
    <NavigationBar/>
  )
}

export default AppContainer
