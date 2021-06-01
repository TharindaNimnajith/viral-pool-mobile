import React from 'react'
import {StyleSheet} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  amountStyle: {
    color: Colors.primaryColor,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 50
  },
  arrowStyle: {
    flex: 0.08,
    alignItems: 'center',
    justifyContent: 'center'
  },
  avatarStyle: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  contentProvidedStyle: {
    color: Colors.successColor,
    fontSize: 13,
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 2
  },
  contentRequiredStyle: {
    color: Colors.primaryColor,
    fontSize: 13,
    flex: 1,
    alignSelf: 'flex-end',
    textAlign: 'right',
    marginRight: 10,
    marginBottom: 2
  },
  contentStyle: {
    flex: 0.92
  },
  horizontalStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5
  },
  iconViewStyle: {
    alignSelf: 'center',
    alignItems: 'center'
  },
  itemStyleDefault: {
    shadowColor: Colors.tertiaryColor, // IOS
    shadowOffset: {height: 1, width: 2}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.tertiaryColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  itemStyleFacebook: {
    shadowColor: Colors.tertiaryColor, // IOS
    shadowOffset: {height: 1, width: 2}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.facebookColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  itemStyleInstagram: {
    shadowColor: Colors.tertiaryColor, // IOS
    shadowOffset: {height: 1, width: 2}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.instagramColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  itemStyleTiktok: {
    shadowColor: Colors.tertiaryColor, // IOS
    shadowOffset: {height: 1, width: 2}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.defaultColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  itemStyleYoutube: {
    shadowColor: Colors.tertiaryColor, // IOS
    shadowOffset: {height: 1, width: 2}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 4, //IOS
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderLeftWidth: 6,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderLeftColor: Colors.primaryColor,
    marginVertical: 6,
    marginHorizontal: wp('4%'),
    paddingHorizontal: 10
  },
  titleStyle: {
    color: Colors.defaultColor,
    fontSize: 18,
    flex: 1,
    flexWrap: 'wrap',
    textAlignVertical: 'center',
    marginLeft: 10
  }
})
