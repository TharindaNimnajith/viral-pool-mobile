import React from 'react'
import {GlobalState} from '../util/global-state'
import NavigationBar from './navigation-bar'
import ExpoPushNotifications from './expo-push-notifications'

const AppContainer = () => {
  return (
    <GlobalState>
      <ExpoPushNotifications/>
      <NavigationBar/>
    </GlobalState>
  )
}

export default AppContainer
