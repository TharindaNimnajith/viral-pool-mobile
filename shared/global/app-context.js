import {createContext} from 'react'

export const AppContext = createContext({
  userData: null,
  newNotifications: false,
  SetUserData: async () => {
  },
  SetNewNotifications: async () => {
  }
})
