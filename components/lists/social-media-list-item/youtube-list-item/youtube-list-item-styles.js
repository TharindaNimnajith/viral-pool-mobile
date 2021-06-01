import React from 'react'
import {StyleSheet} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../../shared/const/colors'

export const styles = StyleSheet.create({
  avatarStyle: {
    width: 60,
    height: 60,
    borderRadius: 30
  },
  deleteStyle: {
    width: '10%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  horizontalStyle: {
    flexDirection: 'row'
  },
  iconViewStyle: {
    width: '20%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  itemStyle: {
    shadowColor: Colors.tertiaryColor, // IOS
    shadowOffset: { height: 1, width: 2 }, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.primaryColor,
    justifyContent: 'center',
    paddingVertical: 8
  },
  mainViewStyle: {
    flexDirection: 'row'
  },
  statStyle: {
    color: Colors.tertiaryColor,
    fontSize: 13,
    textAlign: 'right',
    width: '55%'
  },
  statTitleStyle: {
    color: Colors.tertiaryColor,
    fontSize: 13,
    width: '40%'
  },
  textStyle: {
    fontSize: 18,
    color: Colors.defaultColor,
    marginBottom: 5
  },
  viewStyle: {
    width: '64%',
    marginLeft: '4%',
    justifyContent: 'center'
  }
})
