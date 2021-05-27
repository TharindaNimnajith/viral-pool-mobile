import React, {useState} from 'react'
import {AppContext} from './app-context'

export const GlobalState = props => {
  const [expoPushToken, setExpoPushToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const [newNotifications, setNewNotifications] = useState(false)

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
      expoPushToken: expoPushToken,
      userData: userData,
      newNotifications: newNotifications,
      SetExpoPushToken: SetExpoPushToken,
      SetUserData: SetUserData,
      SetNewNotifications: SetNewNotifications
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
