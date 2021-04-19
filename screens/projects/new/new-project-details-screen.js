import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'

const NewProjectDetailsScreen = () => {
  return (
    <View style={styles.mainViewStyle}>
      <Text>
        New Project Details
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

NewProjectDetailsScreen.navigationOptions = () => {
  return {
    headerTitle: 'NEW PROJECT DETAILS'
  }
}

export default NewProjectDetailsScreen
