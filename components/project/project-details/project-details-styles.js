import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  acceptButtonStyle: {
    marginTop: hp('3%'),
    marginHorizontal: 7,
    backgroundColor: Colors.successColor,
    alignItems: 'center',
    padding: 8,
    width: wp('40%'),
    borderRadius: 5
  },
  amountStyle: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: 'bold'
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
  contentProvidedStyle: {
    color: Colors.successColor,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2
  },
  contentRequiredStyle: {
    color: Colors.primaryColor,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 2
  },
  contentStatusStyle: {
    width: '40%'
  },
  creatorStyle: {
    color: Colors.tertiaryColor,
    marginBottom: 12,
    fontSize: 16
  },
  dateStyle: {
    color: Colors.tertiaryColor,
    fontSize: 14,
    width: '30%',
    textAlign: 'right',
    marginTop: 2
  },
  fileStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  horizontalStyle: {
    flexDirection: 'row'
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
    minHeight: hp('93.6%')
  },
  pointsIconStyle: {
    justifyContent: 'center'
  },
  pointsStyle: {
    flex: 1,
    alignItems: 'flex-end'
  },
  pointsTextStyle: {
    color: Colors.primaryColor,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 3
  },
  projectNameStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  rejectButtonStyle: {
    marginTop: hp('3%'),
    marginHorizontal: 7,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 8,
    width: wp('40%'),
    borderRadius: 5
  },
  rewardsViewStyle: {
    marginBottom: 16
  },
  sampleViewStyle: {
    marginHorizontal: wp('6%'),
    marginTop: hp('2.5%'),
    marginBottom: hp('1.5%'),
    backgroundColor: Colors.fadedEffectColor,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  socialMediaIconStyle: {
    width: '30%'
  },
  tiktokStyle: {
    width: wp('7%'),
    height: wp('7%'),
    marginLeft: -wp('0.5%'),
    marginBottom: -5
  },
  titleStyle: {
    color: Colors.primaryColor,
    fontSize: 18
  },
  viewStyle: {
    marginHorizontal: wp('6%'),
    marginTop: hp('2.5%'),
    marginBottom: hp('0.5%'),
    backgroundColor: Colors.fadedEffectColor,
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 20
  }
})
