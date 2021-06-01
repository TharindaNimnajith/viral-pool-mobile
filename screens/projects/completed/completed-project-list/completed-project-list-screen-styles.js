import React from 'react'
import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../../shared/const/colors'

export const styles = StyleSheet.create({
  bodyStyle: {
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    marginHorizontal: wp('2%')
  },
  cardStyle: {
    borderRadius: hp('5%'),
    borderColor: Colors.primaryColor,
    borderWidth: 3,
    alignItems: 'center',
    paddingVertical: hp('2%'),
    width: wp('85%'),
    marginTop: hp('3%'),
    alignSelf: 'center'
  },
  cardTitleStyle: {
    fontSize: 24,
    marginLeft: 8,
    marginVertical: 5
  },
  emptyListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
  },
  errorMessageStyle: {
    color: Colors.tertiaryColor,
    fontSize: 18
  },
  headerStyle: {
    width: wp('85%'),
    borderBottomRightRadius: hp('6%'),
    borderBottomLeftRadius: hp('6%'),
    alignSelf: 'center'
  },
  horizontalContentStyle: {
    flexDirection: 'row',
    marginBottom: hp('2%')
  },
  iconViewStyle: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
    alignItems: 'center'
  },
  lineStyle: {
    height: 1.5,
    width: wp('62%'),
    backgroundColor: Colors.primaryColor,
    marginVertical: hp('1.5%')
  },
  listStyle: {
    borderRadius: 25,
    paddingVertical: 18,
    paddingHorizontal: 5
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
    backgroundColor: Colors.secondaryColor,
    minHeight: hp('93.6%')
  },
  pendingAmountStyle: {
    fontSize: 50,
    color: Colors.tertiaryColor
  },
  pendingUnitStyle: {
    color: Colors.tertiaryColor,
    fontSize: 30,
    textAlignVertical: 'bottom',
    marginLeft: 10,
    marginBottom: 5
  },
  reloadMessageStyle: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginTop: 10
  },
  sectionTitleStyle: {
    fontSize: 22,
    marginLeft: wp('4%'),
    marginTop: hp('1%'),
    marginBottom: hp('2%')
  },
  totalAmountStyle: {
    fontSize: 50,
    color: Colors.primaryColor
  },
  totalUnitStyle: {
    color: Colors.primaryColor,
    fontSize: 30,
    textAlignVertical: 'bottom',
    marginLeft: 10,
    marginBottom: 5
  }
})
