import {StyleSheet} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/const/colors'

export const styles = StyleSheet.create({
  bodyStyle: {
    marginBottom: hp('0.5%'),
    marginHorizontal: wp('2%')
  },
  emptyListStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40
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
  sectionTitleStyle: {
    fontSize: 22,
    marginLeft: wp('4%'),
    marginTop: hp('1%'),
    marginBottom: hp('2%')
  }
})
