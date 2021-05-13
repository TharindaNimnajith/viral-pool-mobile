import {createContext} from 'react'

export const AppContext = createContext({
  accessToken: null,
  refreshToken: null,
  expoPushToken: null,
  userData: null,
  SetAccessToken: async () => {
  },
  SetRefreshToken: async () => {
  },
  SetExpoPushToken: async () => {
  },
  SetUserData: async () => {
  }
})
