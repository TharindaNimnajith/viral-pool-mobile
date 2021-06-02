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
  containerStyle: {
    width: '100%',
    paddingHorizontal: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    flexDirection: 'row',
    paddingVertical: 20,
    backgroundColor: Colors.primaryColor,
    borderBottomRightRadius: hp('6%'),
    borderBottomLeftRadius: hp('6%')
  },
  lineStyle: {
    color: Colors.fadedEffectColor,
    marginHorizontal: 10
  },
  pointsStyle: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 3
  },
  socialMediaIconStyle: {
    paddingVertical: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginLeft: 3
  },
  socialMediaIconTextStyle: {
    color: Colors.secondaryColor,
    marginRight: 10,
    marginLeft: 4
  },
  socialMediaIconViewStyle: {
    flexDirection: 'row'
  },
  textWrapperStyle: {
    flexShrink: 1,
    maxWidth: 250
  },
  titleStyle: {
    color: Colors.fadedEffectColor
  },
  usernameStyle: {
    fontSize: 23,
    color: Colors.secondaryColor
  },
  valueStyle: {
    color: Colors.secondaryColor,
    fontWeight: 'bold',
    marginRight: 5
  },
  viewStyle: {
    marginLeft: 6,
    justifyContent: 'center'
  }
})
