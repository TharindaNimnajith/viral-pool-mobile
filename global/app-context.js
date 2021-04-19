import {createContext} from 'react'

export const AppContext = createContext({
  accessToken: null,
  refreshToken: null,
  expoPushToken: null,
  SetAccessToken: async () => {
  },
  SetRefreshToken: async () => {
  },
  SetExpoPushToken: async () => {
  }
})
