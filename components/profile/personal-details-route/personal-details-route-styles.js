import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonDisabledStyle: {
    marginTop: hp('3%'),
    marginBottom: hp('1%'),
    backgroundColor: Colors.tertiaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  containerStyle: {
    marginTop: hp('1%'),
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  customStyle: {
    dateIcon: {
      position: 'absolute',
      left: 0,
      top: 4,
      marginLeft: 0
    },
    dateInput: {
      marginLeft: 36,
      borderColor: Colors.defaultColor,
      borderRadius: 5
    },
    dateText: {
      color: Colors.tertiaryColor
    },
    placeholderText: {
      color: Colors.tertiaryColor
    }
  },
  datePickerStyle: {
    borderColor: Colors.secondaryColor,
    width: wp('80%'),
    marginTop: hp('1%'),
    color: Colors.tertiaryColor
  },
  labelStyle: {
    marginLeft: wp('10%'),
    marginTop: hp('2%'),
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
    minHeight: hp('86%')
  },
  multilineTextInputStyle: {
    textAlignVertical: 'top',
    borderColor: Colors.defaultColor,
    width: wp('80%'),
    height: hp('20%'),
    borderWidth: 1,
    borderRadius: 5,
    marginTop: hp('1%'),
    padding: 10,
    color: Colors.tertiaryColor
  },
  radioLabelStyle: {
    color: Colors.primaryColor,
    marginRight: wp('20%')
  },
  radioStyle: {
    marginTop: hp('1%'),
    width: wp('80%')
  },
  textInputStyle: {
    borderColor: Colors.defaultColor,
    width: wp('80%'),
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginTop: hp('1%'),
    padding: 10,
    color: Colors.tertiaryColor
  }
})
