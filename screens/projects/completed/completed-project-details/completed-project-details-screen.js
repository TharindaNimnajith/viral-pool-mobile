import React from 'react'
import NotificationButton from '../../../../components/header/notification-button/notification-button'
import ProjectDetails from '../../../../components/project/project-details/project-details'

const CompletedProjectDetailsScreen = props => {
  return (
    <ProjectDetails project={props}/>
  )
}

CompletedProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Job Details',
    headerRight: () => (
      <NotificationButton navigation={navData.navigation}/>
    )
  }
}

export default CompletedProjectDetailsScreen
