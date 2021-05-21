import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
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
import {FontAwesome, FontAwesome5, Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import {AppContext} from '../util/app-context'
import Colors from '../util/colors'
import {showAlert} from '../util/common-helpers'
import Constants from '../util/constants'
import Menu from '../components/menu-button'
import CombinedButtons from '../components/combined-buttons'
import DashboardLogo from '../components/dashboard-logo'
import ProjectListItem from '../components/project-list-item'

const DashboardScreen = props => {
  const appContext = useContext(AppContext)

  const [ongoingProjects, setOngoingProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    const data = {
      contentCreatorId: appContext.userData.id,
      expoToken: appContext.expoPushToken
    }
    axios.post('content-creator-notification/token', data).then(async response => {
      if (response.status === 200) {
        axios.get('project-cc-strategy?status=1').then(async response => {
          setLoading(false)
          setRefresh(false)
          if (response.status === 200)
            setOngoingProjects(response.data.data)
          else
            await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        }).catch(async error => {
          setLoading(false)
          setRefresh(false)
          await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
          console.log(error)
        })
      } else {
        setLoading(false)
        setRefresh(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      setRefresh(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    const data = {
      contentCreatorId: appContext.userData.id,
      expoToken: appContext.expoPushToken
    }
    axios.post('content-creator-notification/token', data).then(async response => {
      if (response.status === 200) {
        axios.get('project-cc-strategy?status=1').then(async response => {
          if (response.status === 200)
            setOngoingProjects(response.data.data)
          else
            await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
        }).catch(async error => {
          await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
          console.log(error)
        })
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  const renderItemsFunction = itemData => {
    return (
      <ProjectListItem navigation={props.navigation}
                       itemData={itemData}
                       screen='OngoingProjectDetails'
                       refreshFunction={refreshFunction}/>
    )
  }

  const onProfilePress = async () => {
    props.navigation.navigate('Profile')
  }

  const onEarningsPress = async () => {
    props.navigation.navigate('Earnings')
  }

  const refreshFunction = () => {
    setRefresh(true)
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
              <Text style={styles.textStyle}
                    onPress={onProfilePress}>
                {Constants.RANK}
              </Text>
              <TouchableOpacity style={styles.cardStyle}
                                onPress={onEarningsPress}>
                <View style={styles.horizontalContentStyle1}>
                  <FontAwesome name='dollar'
                               size={25}
                               color={Colors.primaryColor}/>
                  <Text style={styles.cardTitleStyle}>
                    Total Earnings
                  </Text>
                </View>
                <View style={styles.horizontalContentStyle2}>
                  <Text style={styles.earnedAmountStyle}>
                    54,000
                  </Text>
                  <Text style={styles.unitStyle}>
                    LKR
                  </Text>
                </View>
                <View style={styles.horizontalContentStyle3}>
                  <Text style={styles.cardTextStyle}>
                    View All
                  </Text>
                  <FontAwesome5 name='chevron-circle-right'
                                size={16}
                                color={Colors.primaryColor}/>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.bodyStyle}>
            <Text style={styles.sectionTitleStyle}>
              Recent Jobs
            </Text>
            <View style={styles.listStyle}>
              {
                ongoingProjects.length > 0 ? (
                  <View>
                    <FlatList keyExtractor={(item, index) => index.toString()}
                              data={ongoingProjects}
                              numColumns={1}
                              renderItem={renderItemsFunction}/>
                  </View>
                ) : (
                  <View style={styles.emptyListStyle}>
                    <Ionicons name='warning'
                              size={80}
                              color={Colors.tertiaryColor}/>
                    <Text style={styles.errorMessageStyle}>
                      {Constants.EMPTY_LIST}
                    </Text>
                    <TouchableOpacity onPress={refreshFunction}>
                      <Text style={styles.reloadMessageStyle}>
                        Reload?
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              }
            </View>
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
    width: hp('16%'),
    height: hp('16%'),
    borderRadius: hp('8%'),
    borderWidth: 2,
    borderColor: Colors.secondaryColor,
    marginTop: hp('4%')
  },
  bodyStyle: {
    marginTop: hp('5%'),
    marginBottom: hp('4%'),
    marginHorizontal: wp('7%')
  },
  cardStyle: {
    backgroundColor: Colors.fadedEffectColor,
    borderRadius: hp('5%'),
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('20%'),
    marginVertical: hp('3%')
  },
  cardTextStyle: {
    marginRight: 8,
    fontSize: 17,
    bottom: 2
  },
  cardTitleStyle: {
    fontSize: 22,
    marginLeft: 8
  },
  earnedAmountStyle: {
    fontSize: 50,
    color: Colors.primaryColor
  },
  emptyListStyle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessageStyle: {
    color: Colors.tertiaryColor,
    fontSize: 18
  },
  horizontalContentStyle1: {
    flexDirection: 'row',
    marginVertical: hp('1%')
  },
  horizontalContentStyle2: {
    flexDirection: 'row',
    marginBottom: hp('2%')
  },
  horizontalContentStyle3: {
    flexDirection: 'row'
  },
  listStyle: {
    marginTop: hp('2%'),
    backgroundColor: Colors.fadedEffectColor,
    borderRadius: hp('5%'),
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('10%')
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
    backgroundColor: Colors.secondaryColor
  },
  headerStyle: {
    backgroundColor: Colors.primaryColor,
    height: hp('58%'),
    borderBottomRightRadius: hp('6%'),
    borderBottomLeftRadius: hp('6%')
  },
  reloadMessageStyle: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginTop: 10
  },
  sectionTitleStyle: {
    fontSize: 22,
    marginLeft: 10
  },
  textStyle: {
    color: Colors.secondaryColor
  },
  titleStyle: {
    fontSize: 22,
    color: Colors.secondaryColor,
    marginTop: hp('2%'),
    marginBottom: hp('1%')
  },
  viewStyle: {
    alignItems: 'center'
  },
  unitStyle: {
    color: Colors.primaryColor,
    fontSize: 30,
    textAlignVertical: 'bottom',
    marginLeft: 10,
    marginBottom: 5
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

DashboardScreen.navigationOptions = navData => {
  return {
    headerTitle: '',
    headerLeft: () => (
      <View>
        <Menu navigation={navData.navigation}/>
        <DashboardLogo/>
      </View>
    ),
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default DashboardScreen
