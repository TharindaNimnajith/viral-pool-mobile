import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'

const CompletedProjectDetailsScreen = () => {
  return (
    <View style={styles.mainViewStyle}>
      <Text>
        Completed Project Details
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

CompletedProjectDetailsScreen.navigationOptions = () => {
  return {
    headerTitle: 'COMPLETED PROJECT DETAILS'
  }
}

export default CompletedProjectDetailsScreen
