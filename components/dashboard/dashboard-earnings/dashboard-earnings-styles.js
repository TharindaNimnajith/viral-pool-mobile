import React from 'react'
import {StyleSheet} from 'react-native'
import Colors from '../../../shared/const/colors'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'

export const styles = StyleSheet.create({
  amountCurrencyTextStyle: {
    textAlign: 'right',
    fontSize: 20
  },
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
  cardTitleStyle: {
    fontSize: 18
  },
  col: {
    width: '50%'
  },
  earnedAmountStyle: {
    fontSize: 30,
    color: Colors.primaryColor
  },
  horizontalContentStyle2: {
    flexDirection: 'row',
    marginBottom: hp('1%')
  },
  iconText: {
    marginBottom: 10,
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row'
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
  verticalLine: {
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: Colors.primaryColor
  }
})
