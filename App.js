import React from 'react'
import {LogBox} from 'react-native'
import Navigation from './shared/navigation'
import Constants from './shared/constants'

export default function App() {
  LogBox.ignoreLogs([Constants.ignoredWarning])

  return (
    <Navigation/>
  )
}
