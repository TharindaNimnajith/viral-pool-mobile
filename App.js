import React from 'react'
import {LogBox} from 'react-native'
import {warnings} from './util/common-helpers'
import AppContainer from './components/app-container'

const App = () => {
  LogBox.ignoreLogs(warnings)

  return (
    <AppContainer/>
  )
}

export default App
