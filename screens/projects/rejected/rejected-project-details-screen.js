import React from 'react'
import {Text, View} from 'react-native'

const RejectedProjectDetailsScreen = () => {
  return (
    <View>
      <Text>
        Rejected Project Details
      </Text>
    </View>
  )
}

RejectedProjectDetailsScreen.navigationOptions = () => {
  return {
    headerTitle: 'REJECTED PROJECT DETAILS'
  }
}

// noinspection JSUnusedGlobalSymbols
export default RejectedProjectDetailsScreen
