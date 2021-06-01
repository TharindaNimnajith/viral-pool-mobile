import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  avatarStyle: {
    width: hp('22%'),
    height: hp('22%'),
    borderRadius: hp('11%'),
    borderWidth: 2,
    borderColor: Colors.secondaryColor,
    alignSelf: 'center',
    position: 'absolute',
    marginTop: hp('16%')
  },
  bodyContentStyle: {
    alignItems: 'center'
  },
  bodyStyle: {
    marginTop: hp('11%'),
    marginBottom: hp('1%')
  },
  buttonStyle: {
    marginTop: hp('4.5%'),
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  editPhotoStyle: {
    backgroundColor: Colors.secondaryColor,
    borderRadius: 25,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    top: hp('21%'),
    left: hp('32%')
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: hp('28%'),
    borderBottomRightRadius: wp('10%'),
    borderBottomLeftRadius: wp('10%')
  },
  infoStyle: {
    marginTop: hp('4%')
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
  resetButtonStyle: {
    marginTop: hp('2%'),
    backgroundColor: Colors.defaultColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  textStyle: {
    fontSize: 18,
    color: Colors.defaultColor,
    textAlign: 'center',
    marginLeft: 15
  },
  titleStyle: {
    fontSize: 28,
    color: Colors.primaryColor,
    marginTop: hp('2%')
  },
  viewStyle: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  }
})
