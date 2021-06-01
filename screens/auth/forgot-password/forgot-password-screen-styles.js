import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  mainViewStyle: {
    minHeight: hp('102.2%'),
    backgroundColor: Colors.primaryColor
  },
  refreshStyle: {
    marginTop: 10
  },
  webViewStyle: {
    marginTop: 12,
    marginHorizontal: 15
  }
})
