import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: Colors.defaultColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonDisabledStyle: {
    marginTop: 30,
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  forgotPasswordLabelStyle: {
    color: Colors.secondaryColor,
    marginRight: 5
  },
  forgotPasswordStyle: {
    marginRight: 40,
    marginTop: 20,
    alignSelf: 'flex-end'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  imageStyle: {
    width: 140,
    height: 140,
    marginBottom: 20,
    marginTop: 20
  },
  headerStyle: {
    alignItems: 'center',
    marginBottom: 15
  },
  labelStyle: {
    marginLeft: 40,
    marginTop: 20,
    color: Colors.secondaryColor,
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
    minHeight: hp('104%'),
    backgroundColor: Colors.primaryColor
  },
  refreshStyle: {
    marginTop: 10
  },
  textInputStyle: {
    backgroundColor: Colors.secondaryColor,
    borderColor: Colors.primaryColor,
    width: wp('80%'),
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    padding: 10,
    color: Colors.tertiaryColor
  },
  textStyle: {
    width: wp('70%'),
    color: Colors.secondaryColor,
    textAlign: 'center',
    lineHeight: 22
  },
  titleStyle: {
    textTransform: 'uppercase',
    color: Colors.secondaryColor,
    marginTop: hp('5%'),
    fontSize: 30
  }
})
