import React from 'react'
import {StyleSheet, View} from 'react-native'

const ProjectDetails = props => {
  console.log(props)

  return (
    <View style={styles.viewStyle}>
      {/*<Text>*/}
      {/*  {project.title}*/}
      {/*</Text>*/}
      {/*<Text>*/}
      {/*  {project.description}*/}
      {/*</Text>*/}
      {/*<Text>*/}
      {/*  {project.status}*/}
      {/*</Text>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    margin: 20
  }
})

export default ProjectDetails
