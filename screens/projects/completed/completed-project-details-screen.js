import React from 'react'
import {Text, View} from 'react-native'

const CompletedProjectDetailsScreen = () => {
  return (
    <View>
      <Text>
        Completed Project Details
      </Text>
    </View>
  )
}

CompletedProjectDetailsScreen.navigationOptions = () => {
  return {
    headerTitle: 'COMPLETED PROJECT DETAILS'
  }
}

export default CompletedProjectDetailsScreen
