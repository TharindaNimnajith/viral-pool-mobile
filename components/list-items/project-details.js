import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Colors from '../../shared/colors'

const ProjectDetails = () => {
  return (
    <View style={styles.viewStyle}>
      <Text>
        Project Details
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.disabledColor
  }
})

export default ProjectDetails
