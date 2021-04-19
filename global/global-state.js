import React, {useState} from 'react'
import {AppContext} from './app-context'

export const GlobalState = props => {
  const [expoPushToken, setExpoPushToken] = useState(null)
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)

  const SetExpoPushToken = async data => {
    setExpoPushToken(data)
  }

  const SetAccessToken = async data => {
    setAccessToken(data)
  }

  const SetRefreshToken = async data => {
    setRefreshToken(data)
  }

  return (
    <AppContext.Provider value={{
      expoPushToken: expoPushToken,
      accessToken: accessToken,
      refreshToken: refreshToken,
      SetExpoPushToken: SetExpoPushToken,
      SetAccessToken: SetAccessToken,
      SetRefreshToken: SetRefreshToken
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
