import React, {useState} from 'react'
import {AppContext} from './app-context'

export const GlobalState = props => {
  // const [loginData, setLoginData] = useState(null)
  const [expoToken, setExpoToken] = useState(null)

  // const login = async data => {
  //   setLoginData(data)
  // }
  //
  // const logout = async () => {
  //   setLoginData(null)
  // }

  const setToken = async data => {
    // console.log(data)
    setExpoToken(data)
  }

  return (
    <AppContext.Provider value={{
      // loginData: loginData,
      expoToken: expoToken,
      // login: login,
      // logout: logout,
      setToken: setToken
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
