import React from 'react'
import CombinedButtons from '../components/combined-buttons'
import ProjectDetails from '../components/project-details'

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
