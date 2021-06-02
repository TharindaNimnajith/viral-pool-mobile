import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  loadingStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blurEffectColor
  },
  mainViewStyle: {
    minHeight: hp('104%'),
    backgroundColor: Colors.primaryColor,
    paddingBottom: 15
  },
  refreshStyle: {
    marginTop: 20
  },
  webViewStyle: {
    marginTop: 12,
    marginHorizontal: 10,
    backgroundColor: Colors.primaryColor
  }
})
