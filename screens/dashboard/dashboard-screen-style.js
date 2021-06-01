import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/const/colors'

export const styles = StyleSheet.create({
  betweenStyle: {
    marginLeft: 6
  },
  bodyStyle: {
    marginBottom: hp('0.5%'),
    marginHorizontal: wp('2%')
  },
  countStyle: {
    marginHorizontal: 6,
    color: Colors.secondaryColor,
    textAlignVertical: 'center'
  },
  dashboardStyle: {
    paddingHorizontal: 10
  },
  emptyListStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessageStyle: {
    color: Colors.tertiaryColor,
    fontSize: 18
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    borderBottomRightRadius: hp('6%'),
    borderBottomLeftRadius: hp('6%')
  },
  horizontalContentStyle: {
    flexDirection: 'row'
  },
  horizontalContentStyle2: {
    flexDirection: 'row',
    marginBottom: hp('1%')
  },
  listStyle: {
    borderRadius: 25,
    paddingVertical: 15,
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
  pointsTitleStyle: {
    textTransform: 'uppercase',
    color: Colors.secondaryColor,
    fontSize: 20,
    marginLeft: 5,
    marginBottom: 2
  },
  pointsValueStyle: {
    color: Colors.secondaryColor,
    fontSize: 45
  },
  pointsViewStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileStyle: {
    justifyContent: 'center'
  },
  rankCardStyle: {
    alignItems: 'center',
    backgroundColor: Colors.secondaryColor,
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 7,
    marginRight: wp('10%'),
    justifyContent: 'center'
  },
  rankTitleStyle: {
    textTransform: 'uppercase',
    color: Colors.primaryColor,
    fontSize: 18
  },
  rankValueStyle: {
    color: Colors.primaryColor,
    fontSize: 45
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
  socialMediaStyle: {
    marginTop: 8,
    alignSelf: 'baseline'
  },
  tiktokCountStyle: {
    marginHorizontal: 3,
    color: Colors.secondaryColor,
    textAlignVertical: 'center'
  },
  titleStyle: {
    fontSize: 18,
    color: Colors.secondaryColor
  },
  viewStyle: {
    marginLeft: wp('6%'),
    marginTop: wp('4%')
  },
  unitStyle: {
    color: Colors.primaryColor,
    fontSize: 18,
    textAlignVertical: 'bottom',
    marginLeft: 10,
    marginBottom: 5
  }
})
