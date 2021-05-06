import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const ProjectDetails = props => {
  let project = props.navigation.getParam('project')

  return (
    <View style={styles.viewStyle}>
      <Text>
        {project.project.title}
      </Text>
      <Text>
        {project.project.description}
      </Text>
      <Text>
        {project.project.status}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    margin: 20
  }
})

export default ProjectDetails
