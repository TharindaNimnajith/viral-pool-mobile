import React from 'react'
import {LogBox} from 'react-native'
import {GlobalState} from './util/global-state'
import Constants from './util/constants'
import NavigationBar from './components/navigation-bar'
import ExpoPushNotifications from './components/expo-push-notifications'

const App = () => {
  const warnings = [
    Constants.WARNING_1,
    Constants.WARNING_2,
    Constants.WARNING_3,
    Constants.WARNING_4
  ]

  LogBox.ignoreLogs(warnings)

  return (
    <GlobalState>
      <ExpoPushNotifications/>
      <NavigationBar/>
    </GlobalState>
  )
}

export default App
