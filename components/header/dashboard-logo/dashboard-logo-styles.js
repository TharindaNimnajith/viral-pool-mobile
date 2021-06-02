import React from 'react'
import {StyleSheet} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
  logoStyle: {
    position: 'absolute',
    marginLeft: wp('30%'),
    width: wp('40%'),
    height: wp('8.5%')
  }
})
