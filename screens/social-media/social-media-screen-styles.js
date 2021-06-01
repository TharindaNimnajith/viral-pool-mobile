import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/const/colors'

export const styles = StyleSheet.create({
  avatarStyle: {
    width: wp('12%'),
    height: wp('12%'),
    marginLeft: -wp('1.4%')
  },
  addIconStyle: {
    alignItems: 'flex-end',
    marginRight: wp('7%'),
    flex: 1
  },
  emptyListStyle: {
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessageStyle: {
    color: Colors.tertiaryColor,
    fontSize: 18
  },
  facebookTitleStyle: {
    color: Colors.facebookColor,
    fontSize: 30,
    marginLeft: wp('2%')
  },
  footerStyle: {
    marginTop: 10
  },
  headerStyle: {
    marginBottom: 25
  },
  horizontalViewStyle: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    marginLeft: wp('7%'),
    alignItems: 'center'
  },
  instagramTitleStyle: {
    color: Colors.instagramColor,
    fontSize: 30,
    marginLeft: wp('2%')
  },
  listStyle: {
    alignSelf: 'center',
    width: wp('95%'),
    marginVertical: hp('1%')
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
    minHeight: hp('93.6%')
  },
  reloadMessageStyle: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginTop: hp('1%')
  },
  socialMediaViewStyle: {
    marginTop: hp('1%'),
    marginBottom: hp('2%')
  },
  textInputStyle: {
    borderColor: Colors.primaryColor,
    width: wp('70%'),
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    marginLeft: 0.5,
    paddingVertical: 10,
    paddingLeft: 5,
    color: Colors.tertiaryColor
  },
  tiktokTitleStyle: {
    color: Colors.defaultColor,
    fontSize: 30,
    marginLeft: wp('0.6%')
  },
  titleStyle: {
    color: Colors.primaryColor
  },
  wrapperStyle: {
    marginTop: 2
  },
  youtubeTitleStyle: {
    color: Colors.primaryColor,
    fontSize: 30,
    marginLeft: wp('2%')
  }
})
