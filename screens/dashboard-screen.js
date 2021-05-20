import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
import {AppContext} from '../util/app-context'
import Colors from '../util/colors'
import {showAlert} from '../util/common-helpers'
import Constants from '../util/constants'
import Menu from '../components/menu-button'
import CombinedButtons from '../components/combined-buttons'

const DashboardScreen = props => {
  const appContext = useContext(AppContext)

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setLoading(true)
    const data = {
      contentCreatorId: appContext.userData.id,
      expoToken: appContext.expoPushToken
    }
    axios.post('content-creator-notification/token', data).then(() => {
      setLoading(false)
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    const data = {
      contentCreatorId: appContext.userData.id,
      expoToken: appContext.expoPushToken
    }
    axios.post('content-creator-notification/token', data).catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  const onProfilePress = async () => {
    props.navigation.navigate('Profile')
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <View style={styles.headerStyle}>
            <View style={styles.viewStyle}>
              <TouchableWithoutFeedback onPress={onProfilePress}>
                {
                  appContext.userData.profileImagePath ? (
                    <Image style={styles.avatarStyle}
                           source={{
                             uri: appContext.userData.profileImagePath
                           }}/>
                  ) : (
                    <Image style={styles.avatarStyle}
                           source={require('../assets/user.jpg')}/>
                  )
                }
              </TouchableWithoutFeedback>
              <Text style={styles.titleStyle}
                    onPress={onProfilePress}>
                {appContext.userData.firstName} {appContext.userData.lastName}
              </Text>
            </View>
          </View>
          <View style={styles.bodyStyle}>
            <View style={styles.smallCardsViewStyle}>
              <TouchableOpacity style={styles.cardStyle}>
                <Text style={styles.ongoingProjectStatStyle}>
                  3
                </Text>
                <Text style={styles.statTitleStyle}>
                  Ongoing{'\n'}Projects
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardStyle}>
                <Text style={styles.completedProjectStatStyle}>
                  10
                </Text>
                <Text style={styles.statTitleStyle}>
                  Completed{'\n'}Projects
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cardStyle}>
                <Text style={styles.rejectedProjectStatStyle}>
                  7
                </Text>
                <Text style={styles.statTitleStyle}>
                  Rejected{'\n'}Projects
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.largeCardViewStyle}>
              <View style={styles.cardViewStyle}>
                <Text style={styles.keyStyle}>
                  Total Earnings
                </Text>
                <Text style={styles.valueStyle}>
                  145,000 LKR
                </Text>
              </View>
              <View style={styles.cardViewStyle}>
                <Text style={styles.keyStyle}>
                  Total Top-ups
                </Text>
                <Text style={styles.valueStyle}>
                  10,000 LKR
                </Text>
              </View>
              <View style={styles.cardViewStyle}>
                <Text style={styles.keyStyle}>
                  Total Viralpool Points
                </Text>
                <Text style={styles.valueStyle}>
                  50
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {
            loading &&
            <View style={styles.loadingStyle}>
              <ActivityIndicator size='large'
                                 color={Colors.secondaryColor}/>
            </View>
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    borderWidth: 3,
    borderColor: Colors.secondaryColor,
    position: 'absolute',
    marginTop: wp('5%'),
    marginLeft: wp('8%')
  },
  bodyStyle: {
    marginTop: hp('4%')
  },
  cardStyle: {
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('10%'),
    margin: wp('1%'),
    backgroundColor: Colors.fadedEffectColor
  },
  cardViewStyle: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 5
  },
  completedProjectStatStyle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.successColor,
    alignSelf: 'center'
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
    width: wp('100%'),
    height: hp('93.6%'),
    backgroundColor: Colors.secondaryColor
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: wp('42%'),
    borderBottomRightRadius: wp('10%'),
    borderBottomLeftRadius: wp('10%')
  },
  keyStyle: {
    left: wp('8%'),
    fontSize: 17
  },
  largeCardViewStyle: {
    width: wp('90%'),
    height: hp('15%'),
    borderRadius: wp('10%'),
    backgroundColor: Colors.fadedEffectColor,
    marginTop: hp('18%'),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  ongoingProjectStatStyle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.styleColor,
    alignSelf: 'center'
  },
  rejectedProjectStatStyle: {
    fontSize: 60,
    fontWeight: 'bold',
    color: Colors.errorColor,
    alignSelf: 'center'
  },
  smallCardsViewStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  statTitleStyle: {
    alignSelf: 'center',
    fontSize: 15,
    lineHeight: 17
  },
  titleStyle: {
    fontSize: 22,
    color: Colors.secondaryColor,
    marginTop: wp('15%'),
    marginLeft: wp('44%'),
    marginRight: wp('5%')
  },
  valueStyle: {
    fontWeight: 'bold',
    right: wp('8%'),
    position: 'absolute',
    fontSize: 17
  },
  viewStyle: {
    flexDirection: 'row'
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

DashboardScreen.navigationOptions = navData => {
  return {
    headerTitle: 'VIRAL POOL',
    headerLeft: () => (
      <Menu navigation={navData.navigation}/>
    ),
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default DashboardScreen