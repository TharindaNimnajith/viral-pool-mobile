import React, {useState} from 'react'
import {AppContext} from './app-context'

export const GlobalState = props => {
  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [expoPushToken, setExpoPushToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const [ideaList, setIdeaList] = useState(null)
  const [ideaDetails, setIdeaDetails] = useState(null)
  const [notificationList, setNotificationList] = useState(null)
  const [newProjectList, setNewProjectList] = useState(null)
  const [ongoingProjectList, setOngoingProjectList] = useState(null)
  const [completedProjectList, setCompletedProjectList] = useState(null)
  const [projectDetails, setProjectDetails] = useState(null)

  const SetAccessToken = async data => {
    setAccessToken(data)
  }

  const SetRefreshToken = async data => {
    setRefreshToken(data)
  }

  const SetExpoPushToken = data => {
    setExpoPushToken(data)
  }

  const SetUserData = data => {
    setUserData(data)
  }

  const SetIdeaList = data => {
    setIdeaList(data)
  }

  const SetIdeaDetails = data => {
    setIdeaDetails(data)
  }

  const SetNotificationList = data => {
    setNotificationList(data)
  }

  const SetNewProjectList = data => {
    setNewProjectList(data)
  }

  const SetOngoingProjectList = data => {
    setOngoingProjectList(data)
  }

  const SetCompletedProjectList = data => {
    setCompletedProjectList(data)
  }

  const SetProjectDetails = data => {
    setProjectDetails(data)
  }

  return (
    <AppContext.Provider value={{
      accessToken: accessToken,
      refreshToken: refreshToken,
      expoPushToken: expoPushToken,
      userData: userData,
      ideaList: ideaList,
      ideaDetails: ideaDetails,
      notificationList: notificationList,
      newProjectList: newProjectList,
      ongoingProjectList: ongoingProjectList,
      completedProjectList: completedProjectList,
      projectDetails: projectDetails,
      SetAccessToken: SetAccessToken,
      SetRefreshToken: SetRefreshToken,
      SetExpoPushToken: SetExpoPushToken,
      SetUserData: SetUserData,
      SetIdeaList: SetIdeaList,
      SetIdeaDetails: SetIdeaDetails,
      SetNotificationList: SetNotificationList,
      SetNewProjectList: SetNewProjectList,
      SetOngoingProjectList: SetOngoingProjectList,
      SetCompletedProjectList: SetCompletedProjectList,
      SetProjectDetails: SetProjectDetails
    }}>
      {props.children}
    </AppContext.Provider>
  )
}
