import React from 'react'
import {Text, View} from 'react-native'

const OngoingProjectDetailsScreen = () => {
  return (
    <View>
      <Text>
        Ongoing Project Details
      </Text>
    </View>
  )
}

OngoingProjectDetailsScreen.navigationOptions = () => {
  return {
    headerTitle: 'ONGOING PROJECT DETAILS'
  }
}

export default OngoingProjectDetailsScreen
