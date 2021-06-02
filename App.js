import React from 'react'
import {LogBox} from 'react-native'
import {warnings} from './shared/util/helpers'
import {GlobalState} from './shared/global/global-state'
import AppContainer from './components/main/app-container/app-container'

const App = () => {
  LogBox.ignoreLogs(warnings)

  return (
    <GlobalState>
      <AppContainer/>
    </GlobalState>
  )
}

export default App
