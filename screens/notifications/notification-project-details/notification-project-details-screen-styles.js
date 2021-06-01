import React from 'react'
import CombinedButtons from '../../../components/header/combined-buttons/combined-buttons'
import ProjectDetails from '../../../components/project/project-details/project-details'

const NotificationProjectDetailsScreen = props => {
  return (
    <ProjectDetails project={props}/>
  )
}

NotificationProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Job Details',
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default NotificationProjectDetailsScreen
