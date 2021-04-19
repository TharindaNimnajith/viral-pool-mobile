import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'

const EditIdeaScreen = () => {
  return (
    <View style={styles.mainViewStyle}>
      <Text>
        Edit Idea
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  }
})

EditIdeaScreen.navigationOptions = () => {
  return {
    headerTitle: 'EDIT IDEA'
  }
}

export default EditIdeaScreen
