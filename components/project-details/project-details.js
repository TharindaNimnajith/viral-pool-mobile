import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const ProjectDetails = props => {
  const project = props.project.navigation.getParam('project')

  return (
    <View style={styles.viewStyle}>
      <Text>
        {project.title}
      </Text>
      <Text>
        {project.description}
      </Text>
      <Text>
        {project.status}
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
