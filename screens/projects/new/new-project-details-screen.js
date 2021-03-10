import React from 'react'
import {Text, View} from 'react-native'

const NewProjectDetailsScreen = () => {
  return (
    <View>
      <Text>
        New Project Details
      </Text>
    </View>
  )
}

NewProjectDetailsScreen.navigationOptions = () => {
  return {
    headerTitle: 'NEW PROJECT DETAILS'
  }
}

export default NewProjectDetailsScreen
