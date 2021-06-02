import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: hp('4%'),
    marginHorizontal: 7,
    backgroundColor: Colors.successColor,
    alignItems: 'center',
    padding: 8,
    width: wp('38%'),
    borderRadius: 5
  },
  buttonDisabledStyle: {
    marginTop: hp('4%'),
    marginHorizontal: 7,
    backgroundColor: Colors.tertiaryColor,
    alignItems: 'center',
    padding: 8,
    width: wp('38%'),
    borderRadius: 5
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase',
    marginLeft: 5,
    fontSize: 16
  },
  commentLabelStyle: {
    color: Colors.primaryColor,
    marginBottom: 10,
    fontSize: 17
  },
  commentStyle: {
    color: Colors.defaultColor,
    fontSize: 16,
    marginBottom: 3
  },
  commentViewStyle: {
    backgroundColor: Colors.fadedEffectColor,
    borderRadius: 20,
    width: wp('80%'),
    marginTop: hp('3%'),
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  containerStyle: {
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  deleteButtonStyle: {
    marginTop: hp('4%'),
    marginHorizontal: 7,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 8,
    width: wp('38%'),
    borderRadius: 5
  },
  horizontalStyle: {
    flexDirection: 'row'
  },
  labelStyle: {
    marginLeft: wp('10%'),
    marginTop: hp('3%'),
    color: Colors.primaryColor,
    alignSelf: 'baseline'
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
    minHeight: hp('93.6%'),
    paddingBottom: 15
  },
  multilineTextInputStyle: {
    textAlignVertical: 'top',
    borderColor: Colors.defaultColor,
    width: wp('80%'),
    height: hp('47%'),
    borderWidth: 1,
    borderRadius: 5,
    marginTop: hp('1.5%'),
    padding: 10,
    color: Colors.tertiaryColor
  },
  textInputStyle: {
    borderColor: Colors.defaultColor,
    width: wp('80%'),
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginTop: hp('1.5%'),
    padding: 10,
    color: Colors.tertiaryColor
  }
})
