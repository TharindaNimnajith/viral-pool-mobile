import React, {useState} from 'react'
import {AppContext} from './app-context'

export const GlobalState = props => {
  const [userData, setUserData] = useState(null)
  const [newNotifications, setNewNotifications] = useState(false)

  const SetUserData = async data => {
    setUserData(data)
  }

  const SetNewNotifications = async data => {
    setNewNotifications(data)
  }

  return (
    <AppContext.Provider value={{
      userData: userData,
      newNotifications: newNotifications,
      SetUserData: SetUserData,
      SetNewNotifications: SetNewNotifications
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
