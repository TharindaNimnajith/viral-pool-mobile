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
import {SocialIcon} from 'react-native-elements'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
import {AppContext} from '../../../global/app-context'
import Colors from '../../../util/colors'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'

const DashboardScreen = props => {
  const appContext = useContext(AppContext)

  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setLoading(false)
    setLoading(true)
    let data = {
      contentCreatorId: appContext.userData.id,
      token: appContext.expoPushToken
    }
    axios.post('content-creator-notification/expo-token', data).then(() => {
      setLoading(false)
    }).catch(async error => {
      setLoading(false)
      console.log(error)
    })
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
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
                           source={require('../../../assets/user.jpg')}/>
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
            <View style={styles.socialAccountsViewStyle}>
              <TouchableOpacity activeOpacity={1}>
                <SocialIcon title='Connect with Facebook'
                            button
                            raised={false}
                            type='facebook'
                            iconSize={25}
                            fontStyle={styles.socialIconFontStyle}
                            style={styles.socialIconButtonStyle}/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}>
                <SocialIcon title='Connect with Youtube'
                            button
                            raised={false}
                            type='youtube'
                            iconSize={25}
                            fontStyle={styles.socialIconFontStyle}
                            style={styles.socialIconButtonStyle}/>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={1}>
                <SocialIcon title='Connect with Instagram'
                            button
                            raised={false}
                            type='instagram'
                            iconSize={25}
                            fontStyle={styles.socialIconFontStyle}
                            style={styles.socialIconButtonStyle}/>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tiktokViewStyle}
                                activeOpacity={1}>
                <Image style={styles.tiktokIconStyle}
                       source={require('../../../assets/tiktok.png')}/>
                <View style={styles.tiktokButtonStyle}>
                  <SocialIcon title='Connect with Tiktok'
                              button
                              raised={false}
                              type='github'
                              iconSize={0}
                              fontStyle={styles.socialIconFontStyle}
                              style={styles.socialIconButtonStyle}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          {
            loading ? (
              <View style={styles.loadingStyle}>
                <ActivityIndicator size='large'
                                   color={Colors.secondaryColor}/>
              </View>
            ) : null
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
    height: hp('100%'),
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
  socialAccountsViewStyle: {
    marginTop: hp('4%')
  },
  socialIconButtonStyle: {
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
    width: wp('85%'),
    height: hp('6%'),
    borderRadius: 25
  },
  socialIconFontStyle: {
    fontSize: 18
  },
  statTitleStyle: {
    alignSelf: 'center',
    fontSize: 15,
    lineHeight: 17
  },
  tiktokButtonStyle: {
    justifyContent: 'center',
    flex: 1
  },
  tiktokIconStyle: {
    position: 'absolute',
    zIndex: 1,
    marginLeft: wp('25%'),
    width: 32,
    height: 32
  },
  tiktokViewStyle: {
    flexDirection: 'row',
    alignItems: 'center'
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
    headerTitle: 'Viral Pool',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default DashboardScreen
