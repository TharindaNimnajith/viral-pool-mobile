import React from 'react'
import {StyleSheet} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../../shared/const/colors'

export const styles = StyleSheet.create({
  itemStyle: {
    shadowColor: Colors.tertiaryColor, // IOS
    shadowOffset: {height: 1, width: 2}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginRight: wp('2.5%'),
    marginVertical: 10,
    height: wp('23%'),
    width: wp('23%'),
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center'
  },
  textStyle: {
    marginTop: 8
  }
})
