import React from 'react'
import CombinedButtons from '../components/combined-buttons'
import ProjectDetails from '../components/project-details'

const OngoingProjectDetailsScreen = props => {
  return (
    <ProjectDetails project={props}/>
  )
}

OngoingProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Job Details',
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default OngoingProjectDetailsScreen