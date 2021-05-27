import {createContext} from 'react'

export const AppContext = createContext({
  expoPushToken: null,
  userData: null,
  newNotifications: false,
  SetExpoPushToken: async () => {
  },
  SetUserData: async () => {
  },
  SetNewNotifications: async () => {
  }
})
