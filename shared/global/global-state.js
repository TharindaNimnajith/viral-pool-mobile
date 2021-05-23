import React, {useState} from 'react'
import {AppContext} from './app-context'

export const GlobalState = props => {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [expoPushToken, setExpoPushToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const [newNotifications, setNewNotifications] = useState(false)

  const SetAccessToken = async data => {
    setAccessToken(data)
  }

  const SetRefreshToken = async data => {
    setRefreshToken(data)
  }

  const SetExpoPushToken = async data => {
    setExpoPushToken(data)
  }

  const SetUserData = async data => {
    setUserData(data)
  }

  const SetNewNotifications = async data => {
    setNewNotifications(data)
  }

  return (
    <AppContext.Provider value={{
      accessToken: accessToken,
      refreshToken: refreshToken,
      expoPushToken: expoPushToken,
      userData: userData,
      newNotifications: newNotifications,
      SetAccessToken: SetAccessToken,
      SetRefreshToken: SetRefreshToken,
      SetExpoPushToken: SetExpoPushToken,
      SetUserData: SetUserData,
      SetNewNotifications: SetNewNotifications
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
