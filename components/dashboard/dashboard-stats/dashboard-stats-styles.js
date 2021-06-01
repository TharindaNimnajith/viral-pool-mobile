import React from 'react'
import {StyleSheet} from 'react-native'
import Colors from '../../../shared/const/colors'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
  circleStyle: {
    justifyContent: 'center',
    borderColor: Colors.primaryColor,
    borderWidth: 3,
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%')
  },
  circleTextStyle: {
    //flex: 1,
    textAlignVertical: 'center',
    alignSelf: 'center',
    color: Colors.primaryColor,
    fontSize: 30
  },
  circleTitleStyle: {
    textAlign: 'center',
    color: Colors.defaultColor,
    marginTop: 4
  },
  rowViewStyle: {
    paddingRight: 50,
    paddingLeft: 50,
    marginTop: hp('2.5%'),
    justifyContent: 'space-between',
    width: '100%',
    display: 'flex',
    flexDirection: 'row'
  }
})
