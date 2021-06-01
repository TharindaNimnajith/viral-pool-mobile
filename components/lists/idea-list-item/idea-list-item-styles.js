import React from 'react'
import {StyleSheet} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  arrowStyle: {
    justifyContent: 'center',
    marginLeft: 5
  },
  dateStyle: {
    flex: 1,
    textAlign: 'right',
    color: Colors.tertiaryColor,
    fontSize: 12,
    marginRight: 10
  },
  horizontalStyle: {
    flexDirection: 'row',
    marginTop: 5
  },
  iconViewStyle: {
    width: wp('10.5%'),
    marginLeft: wp('3%')
  },
  itemStyle: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginHorizontal: wp('4%'),
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignContent: 'center',
    marginVertical: 6,
    paddingVertical: 15
  },
  mainViewStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    color: Colors.defaultColor,
    fontSize: 15,
    marginVertical: 7
  },
  titleStyle: {
    fontSize: 17,
    color: Colors.primaryColor
  },
  viewStyle: {
    width: wp('65%')
  }
})
