import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Colors from '../../../shared/colors'

const CompletedProjectDetails = () => {
  return (
    <View style={styles.viewStyle}>
      <Text>
        Completed Project Details
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.disabledColor
  }
})

export default CompletedProjectDetails
