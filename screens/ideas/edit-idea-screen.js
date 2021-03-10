import React from 'react'
import {Text, View} from 'react-native'

const EditIdeaScreen = () => {
  return (
    <View>
      <Text>
        Edit Idea
      </Text>
    </View>
  )
}

EditIdeaScreen.navigationOptions = () => {
  return {
    headerTitle: 'EDIT IDEA'
  }
}

export default EditIdeaScreen
