import React from 'react'
import {StyleSheet} from 'react-native'
import Colors from '../../../shared/const/colors'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
  amountTextStyle: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold'
  },
  cardStyle: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    width: '100%',
    borderColor: Colors.primaryColor,
    borderWidth: 3,
    height: 130,
    borderRadius: hp('3%')
  },
  columnStyle: {
    width: '50%'
  },
  iconTextStyle: {
    marginBottom: 10,
    marginLeft: 5,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
  },
  iconTitleStyle: {
    marginLeft: 5
  },
  pendingEarningsTextStyle: {
    color: Colors.tertiaryColor
  },
  rowViewStyle: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingRight: 30,
    paddingLeft: 30,
    marginTop: hp('2.5%'),
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row'
  },
  totalEarningsTextStyle: {
    color: Colors.primaryColor
  },
  unitStyle: {
    fontSize: 20
  },
  verticalLineStyle: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: Colors.primaryColor
  }
})
