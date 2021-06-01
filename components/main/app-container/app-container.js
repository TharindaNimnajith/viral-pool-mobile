import React from 'react'
import {GlobalState} from '../../../shared/global/global-state'
import NavigationBar from '../navigation-bar/navigation-bar'
import ExpoPushNotifications from '../expo-push-notifications/expo-push-notifications'

const AppContainer = () => {
  return (
    <GlobalState>
      <ExpoPushNotifications/>
      <NavigationBar/>
    </GlobalState>
  )
}

export default AppContainer
