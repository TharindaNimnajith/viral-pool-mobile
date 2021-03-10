import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import React, {useState} from 'react'
import Navigation from './shared/navigation'

const getFonts = () => {
  Font.loadAsync({
    Icons: require('@expo/vector-icons')
  }).then(() => {
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={getFonts}
                  onFinish={() => setFontLoaded(true)}
                  onError={() => console.error('AppLoading Error')}/>
    )
  }

  return (
    <Navigation/>
  )
}
