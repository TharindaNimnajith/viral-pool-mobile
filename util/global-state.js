import React, {useState} from 'react'
import {AppContext} from './app-context'

export const GlobalState = props => {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [expoPushToken, setExpoPushToken] = useState(null)
  const [userData, setUserData] = useState(null)

  const SetAccessToken = async data => {
    setAccessToken(data)
  }

  const SetRefreshToken = async data => {
    setRefreshToken(data)
  }

  const SetExpoPushToken = data => {
    setExpoPushToken(data)
  }

  const SetUserData = data => {
    setUserData(data)
  }

  return (
    <AppContext.Provider value={{
      accessToken: accessToken,
      refreshToken: refreshToken,
      expoPushToken: expoPushToken,
      userData: userData,
      SetAccessToken: SetAccessToken,
      SetRefreshToken: SetRefreshToken,
      SetExpoPushToken: SetExpoPushToken,
      SetUserData: SetUserData
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
