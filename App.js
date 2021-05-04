import React, {useEffect} from 'react'
import {LogBox} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {isReadyRef, navigationRef} from './util/root-navigation'
import {GlobalState} from './global/global-state'
import Constants from './shared/constants'
import NavigationBar from './components/navigation/navigation-bar'
import ExpoPushNotifications from './components/expo-push-notifications/expo-push-notifications'

const App = () => {
  const patterns = [
    Constants.WARNING_1,
    Constants.WARNING_2,
    Constants.WARNING_3,
    Constants.WARNING_4
  ]

  LogBox.ignoreLogs(patterns)

  useEffect(() => {
    return handleNotReady
  }, [])

  const handleNotReady = async () => {
    isReadyRef.current = false
  }

  const handleReady = async () => {
    isReadyRef.current = true
  }

  return (
    <GlobalState>
      <NavigationContainer ref={navigationRef}
                           onReady={handleReady}/>
      <ExpoPushNotifications/>
      <NavigationBar/>
    </GlobalState>
  )
}

export default App
