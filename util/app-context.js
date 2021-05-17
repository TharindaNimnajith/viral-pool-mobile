import {createContext} from 'react'

export const AppContext = createContext({
  accessToken: null,
  refreshToken: null,
  expoPushToken: null,
  userData: null,
  ideaList: null,
  ideaDetails: null,
  notificationList: null,
  newProjectList: null,
  ongoingProjectList: null,
  completedProjectList: null,
  projectDetails: null,
  SetAccessToken: async () => {
  },
  SetRefreshToken: async () => {
  },
  SetExpoPushToken: async () => {
  },
  SetUserData: async () => {
  },
  SetIdeaList: async () => {
  },
  SetIdeaDetails: async () => {
  },
  SetNotificationList: async () => {
  },
  SetNewProjectList: async () => {
  },
  SetOngoingProjectList: async () => {
  },
  SetCompletedProjectList: async () => {
  },
  SetProjectDetails: async () => {
  }
})
