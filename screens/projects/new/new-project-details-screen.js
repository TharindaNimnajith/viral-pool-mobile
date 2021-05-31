import React from 'react'
import CombinedButtons from '../../../components/header/combined-buttons'
import ProjectDetails from '../../../components/project/main/project-details'

const NewProjectDetailsScreen = props => {
  return (
    <ProjectDetails project={props}/>
  )
}

NewProjectDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Job Details',
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default NewProjectDetailsScreen
