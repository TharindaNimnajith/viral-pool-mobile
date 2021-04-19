import {createContext} from 'react'

export const AppContext = createContext({
  expoPushToken: null,
  accessToken: null,
  refreshToken: null,
  SetRefreshToken: async () => {
  },
  SetAccessToken: async () => {
  },
  SetExpoPushToken: async () => {
  }
})
