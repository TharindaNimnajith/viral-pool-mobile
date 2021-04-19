import React, {useState} from 'react'
import {AppContext} from './app-context'

export const GlobalState = props => {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [expoPushToken, setExpoPushToken] = useState(null)

  const SetAccessToken = async data => {
    setAccessToken(data)
  }

  const SetRefreshToken = async data => {
    setRefreshToken(data)
  }

  const SetExpoPushToken = data => {
    setExpoPushToken(data)
  }

  return (
    <AppContext.Provider value={{
      accessToken: accessToken,
      refreshToken: refreshToken,
      expoPushToken: expoPushToken,
      SetAccessToken: SetAccessToken,
      SetRefreshToken: SetRefreshToken,
      SetExpoPushToken: SetExpoPushToken
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
