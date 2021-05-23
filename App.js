import React from 'react'
import {LogBox} from 'react-native'
import {warnings} from './shared/util/helpers'
import AppContainer from './components/main/app-container'

const App = () => {
  LogBox.ignoreLogs(warnings)

  return (
    <AppContainer/>
  )
}

export default App
