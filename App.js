import React from 'react'
import {LogBox} from 'react-native'
import {GlobalState} from './global/global-state'
import Constants from './shared/constants'
import NavigationBar from './components/navigation/navigation-bar'
import ExpoPushNotifications from './components/expo-push-notifications/expo-push-notifications'

const App = () => {
  const patterns = [
    Constants.WARNING_1,
    Constants.WARNING_2,
    Constants.WARNING_3,
    'Animated: `useNativeDriver`'
  ]

  LogBox.ignoreLogs(patterns)

  return (
    <GlobalState>
      <ExpoPushNotifications/>
      <NavigationBar/>
    </GlobalState>
  )
}

export default App
