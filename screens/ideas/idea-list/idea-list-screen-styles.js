import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    position: 'absolute',
    bottom: hp('10%'),
    right: wp('9%'),
    backgroundColor: Colors.primaryColor,
    borderRadius: 30
  },
  emptyListStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessageStyle: {
    color: Colors.tertiaryColor,
    fontSize: 18
  },
  listStyle: {
    width: wp('95%'),
    marginTop: hp('1%'),
    marginBottom: hp('7%')
  },
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
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center',
    minHeight: hp('100%')
  },
  reloadMessageStyle: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginTop: hp('1%')
  }
})
