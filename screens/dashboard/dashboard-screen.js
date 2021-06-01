import React, {useCallback, useContext, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import {AppContext} from '../../shared/global/app-context'
import Colors from '../../shared/const/colors'
import {showAlert, showErrors} from '../../shared/util/helpers'
import Constants from '../../shared/const/constants'
import Menu from '../../components/header/menu-button/menu-button'
import CombinedButtons from '../../components/header/combined-buttons/combined-buttons'
import DashboardLogo from '../../components/header/dashboard-logo/dashboard-logo'
import ProjectListItem from '../../components/lists/project-list-item/project-list-item'
import {DashboardUserProfile} from '../../components/dashboard/dashboard-user-profile/dashboard-user-profile'
import {DashboardStats} from '../../components/dashboard/dashboard-stats/dashboard-stats'
import {DashboardEarnings} from '../../components/dashboard/dashboard-earnings/dashboard-earnings'
import {styles} from './dashboard-screen-style'

const DashboardScreen = props => {
  const appContext = useContext(AppContext)

  const [ongoingProjects, setOngoingProjects] = useState([])
  const [pendingProjectCount, setPendingProjectCount] = useState(0)
  const [ongoingProjectCount, setOngoingProjectCount] = useState(0)
  const [completedProjectCount, setCompletedProjectCount] = useState(0)
  const [youtubeCount, setYoutubeCount] = useState(0)
  const [facebookCount, setFacebookCount] = useState(0)
  const [instagramCount, setInstagramCount] = useState(0)
  const [tiktokCount, setTiktokCount] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [pendingEarnings, setPendingEarnings] = useState(0)
  const [points, setPoints] = useState(0)
  const [rank, setRank] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    axios.get('User').then(async response => {
      if (response.status === 200) {
        await appContext.SetUserData(response.data.data)
        const data = {
          contentCreatorId: response.data.data.id,
          expoToken: appContext.expoPushToken
        }
        axios.post('content-creator-notification/token', data).then(async response => {
          if (response.status === 200) {
            axios.get('dashboard/cc').then(async response => {
              setLoading(false)
              if (response.status === 200) {
                setOngoingProjects(response.data.data.creatorsStrategySummaryResponses)
                setPendingProjectCount(response.data.data.pendingProjectCount)
                setOngoingProjectCount(response.data.data.ongoingProjectCount)
                setCompletedProjectCount(response.data.data.completedProjectCount)
                setYoutubeCount(response.data.data.socialMediaAccountCount.youTubeCount)
                setFacebookCount(response.data.data.socialMediaAccountCount.faceBookCount)
                setInstagramCount(response.data.data.socialMediaAccountCount.instagramCount)
                setTiktokCount(response.data.data.socialMediaAccountCount.tiktokCount)
                setTotalEarnings(response.data.data.totalEarnings)
                setPendingEarnings(response.data.data.pendingEarnings)
                setPoints(response.data.data.points)
                setRank(response.data.data.rank)
              } else {
                await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
              }
            }).catch(async error => {
              setLoading(false)
              await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
              console.log(error)
            })
          } else {
            setLoading(false)
            await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
          }
        }).catch(async error => {
          setLoading(false)
          await showErrors(error.response.data)
          console.log(error.response.data)
        })
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get('User').then(async response => {
      if (response.status === 200) {
        await appContext.SetUserData(response.data.data)
        const data = {
          contentCreatorId: response.data.data.id,
          expoToken: appContext.expoPushToken
        }
        axios.post('content-creator-notification/token', data).then(async response => {
          if (response.status === 200) {
            axios.get('dashboard/cc').then(async response => {
              if (response.status === 200) {
                setOngoingProjects(response.data.data.creatorsStrategySummaryResponses)
                setPendingProjectCount(response.data.data.pendingProjectCount)
                setOngoingProjectCount(response.data.data.ongoingProjectCount)
                setCompletedProjectCount(response.data.data.completedProjectCount)
                setYoutubeCount(response.data.data.socialMediaAccountCount.youTubeCount)
                setFacebookCount(response.data.data.socialMediaAccountCount.faceBookCount)
                setInstagramCount(response.data.data.socialMediaAccountCount.instagramCount)
                setTiktokCount(response.data.data.socialMediaAccountCount.tiktokCount)
                setTotalEarnings(response.data.data.totalEarnings)
                setPendingEarnings(response.data.data.pendingEarnings)
                setPoints(response.data.data.points)
                setRank(response.data.data.rank)
              } else {
                await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
              }
            }).catch(async error => {
              await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
              console.log(error)
            })
          } else {
            await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
          }
        }).catch(async error => {
          await showErrors(error.response.data)
          console.log(error.response.data)
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


  const refreshFunction = async () => {
    setRefresh(true)
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <DashboardUserProfile facebookCount={facebookCount}
                                youtubeCount={youtubeCount}
                                tiktokCount={tiktokCount}
                                instagramCount={instagramCount}
                                rank={rank}
                                points={points}
                                firstName={appContext?.userData?.firstName}
                                lastName={appContext?.userData?.lastName}
                                profileImagePath={appContext?.userData?.profileImagePath}/>
          <DashboardStats pendingProjectCount={pendingProjectCount}
                          ongoingProjectCount={ongoingProjectCount}
                          completedProjectCount={completedProjectCount}/>
          <DashboardEarnings totalEarnings={totalEarnings}
                             pendingEarnings={pendingEarnings}/>
          <View style={styles.bodyStyle}>
            <View style={styles.listStyle}>
              <Text style={styles.sectionTitleStyle}>
                Recent Jobs
              </Text>
              {
                ongoingProjects.length > 0 ? (
                  <FlatList keyExtractor={(item, index) => index.toString()}
                            data={ongoingProjects}
                            numColumns={1}
                            renderItem={renderItemsFunction}/>
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
