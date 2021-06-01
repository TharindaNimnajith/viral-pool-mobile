import React from 'react'
import {StyleSheet} from 'react-native'
import Colors from '../../../shared/const/colors'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
  avatarStyle: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('100%'),
    borderWidth: 1,
    borderColor: Colors.secondaryColor
  },
  container: {
    width: '100%',
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    flexDirection: 'row',
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: Colors.primaryColor,
    borderBottomRightRadius: hp('6%'),
    borderBottomLeftRadius: hp('6%')
  },
  points: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 6
  },
  socialMediaIcon: {
    marginTop: 8,
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 3

  },
  socialMediaIconText: {
    color: Colors.secondaryColor,
    marginRight: 10
  },
  textWrapper: {
    flexShrink: 1, maxWidth: 250
  },
  userNameStyle: {
    fontSize: 23,
    color: Colors.secondaryColor
  }
})
