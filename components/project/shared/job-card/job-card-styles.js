import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../../shared/const/colors'

export const styles = StyleSheet.create({
  avatarStyle: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  buttonDisabledStyle: {
    marginTop: hp('3%'),
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
  centerViewStyle: {
    alignItems: 'center',
    marginBottom: 30
  },
    contentStatusApprovedStyle: {
 color: Colors.successColor
  },
 contentStatusPendingStyle: {
 color: Colors.yellowColor
  },
 contentStatusRejectedStyle: {
 color: Colors.primaryColor
  },
  deleteButtonStyle: {
    marginTop: hp('3%'),
    marginHorizontal: 7,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 8,
    width: wp('38%'),
    borderRadius: 5
  },
  headerStyle: {
    marginTop: 5,
    marginBottom: 27,
    marginLeft: 5
  },
  horizontalStyle: {
    flexDirection: 'row'
  },
  iconViewStyle: {
    width: '20%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  labelStyle: {
    marginTop: 5,
    color: Colors.primaryColor,
    alignSelf: 'baseline',
    marginLeft: wp('4%')
  },
  nameStyle: {
    width: '100%',
    flexShrink: 1,
    alignSelf: 'center',
    marginLeft: 5,
    fontSize: 20
  },
  resultStatusApprovedStyle: {
 color: Colors.successColor
  },
  resultStatusPendingStyle: {
 color: Colors.yellowColor
  },
  resultStatusRejectedStyle: {
 color: Colors.primaryColor
  },
  statusNotPaidStyle: {
    color: Colors.primaryColor,
    fontSize: 13
  },
  statusPaidStyle: {
    color: Colors.successColor,
    fontSize: 13
  },
  submissionViewStyle: {
    backgroundColor: Colors.fadedEffectColor,
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
    marginHorizontal: wp('6%'),
    borderRadius: 20,
    paddingTop: 20
  },
  submitButtonStyle: {
    marginTop: hp('3%'),
    marginHorizontal: 7,
    backgroundColor: Colors.successColor,
    alignItems: 'center',
    padding: 8,
    width: wp('38%'),
    borderRadius: 5
  },
  textInputStyle: {
    borderColor: Colors.defaultColor,
    width: wp('80%'),
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    padding: 10,
    color: Colors.tertiaryColor
  }
})
