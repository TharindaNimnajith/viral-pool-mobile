import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Colors from '../../../shared/colors'

const OngoingProjectDetails = () => {
  return (
    <View style={styles.viewStyle}>
      <Text>
        Ongoing Project Details
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  viewStyle: {
    backgroundColor: Colors.disabledColor
  }
})

export default OngoingProjectDetails
