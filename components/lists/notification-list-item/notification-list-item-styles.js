import React from 'react'
import {StyleSheet} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  arrowStyle: {
    justifyContent: 'center',
    marginLeft: 10
  },
  dateStyle: {
    color: Colors.tertiaryColor,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: 5
  },
  iconViewStyle: {
    width: wp('10.5%'),
    marginLeft: wp('3%'),
    marginBottom: 12,
    justifyContent: 'center'
  },
  itemContentAcceptedStyle: {
    shadowColor: Colors.tertiaryColor,
    shadowOffset: {
      height: 1,
      width: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    height: 75,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'flex-start',
    alignContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.successColor
  },
  itemContentRejectedStyle: {
    shadowColor: Colors.tertiaryColor,
    shadowOffset: {
      height: 1,
      width: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    height: 75,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'flex-start',
    alignContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.primaryColor
  },
  itemDefaultStyle: {
    shadowColor: Colors.tertiaryColor,
    shadowOffset: {
      height: 1,
      width: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    height: 75,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'flex-start',
    alignContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.defaultColor
  },
  itemNewJobStyle: {
    shadowColor: Colors.tertiaryColor,
    shadowOffset: {
      height: 1,
      width: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    height: 75,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'flex-start',
    alignContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.blueColor
  },
  itemPaymentAddedStyle: {
    shadowColor: Colors.tertiaryColor,
    shadowOffset: {
      height: 1,
      width: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    height: 75,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'flex-start',
    alignContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.yellowColor
  },
  itemResultAcceptedStyle: {
    shadowColor: Colors.tertiaryColor,
    shadowOffset: {
      height: 1,
      width: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    height: 75,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'flex-start',
    alignContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.successColor
  },
  itemResultRejectedStyle: {
    shadowColor: Colors.tertiaryColor,
    shadowOffset: {
      height: 1,
      width: 2
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    elevation: 5,
    height: 75,
    marginHorizontal: wp('4%'),
    marginVertical: 6,
    backgroundColor: Colors.secondaryColor,
    alignItems: 'flex-start',
    alignContent: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.primaryColor
  },
  mainViewStyle: {
    flexDirection: 'row'
  },
  textStyle: {
    fontSize: 15,
    color: Colors.defaultColor
  },
  viewStyle: {
    width: wp('62%')
  }
})
