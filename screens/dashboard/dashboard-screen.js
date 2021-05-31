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
import Menu from '../../components/header/menu-button'
import CombinedButtons from '../../components/header/combined-buttons'
import DashboardLogo from '../../components/header/dashboard-logo'
import ProjectListItem from '../../components/lists/project/project-list-item'
import {styles} from './dashboard-screen-style'
import {DashboardUserProfile} from './components/dashboard-user-profile';

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

  const onProfilePress = async () => {
    props.navigation.navigate('Profile')
  }

  const onSocialMediaPress = async () => {
    props.navigation.navigate('SocialMedia')
  }

  const onNewProjectsPress = async () => {
    props.navigation.navigate('NewProjectList')
  }

  const onOngoingProjectsPress = async () => {
    props.navigation.navigate('OngoingProjectList')
  }

  const onCompletedProjectsPress = async () => {
    props.navigation.navigate('CompletedProjectList')
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


            {/*Ag - User name*/}
            {/*<View style={styles.viewStyle}>*/}
            {/*  <View style={styles.horizontalContentStyle}>*/}
            {/*    <TouchableOpacity onPress={onProfilePress}>*/}
            {/*      {*/}
            {/*        appContext.userData && appContext.userData?.profileImagePath ? (*/}
            {/*            <Image style={styles.avatarStyle}*/}
            {/*                   source={{*/}
            {/*                     uri: appContext.userData?.profileImagePath*/}
            {/*                   }}/>*/}
            {/*        ) : (*/}
            {/*            <Image style={styles.avatarStyle}*/}
            {/*                   source={require('../../assets/user.jpg')}/>*/}
            {/*        )*/}
            {/*      }*/}
            {/*    </TouchableOpacity>*/}
            {/*    <View style={styles.profileStyle}>*/}
            {/*      <TouchableOpacity onPress={onProfilePress}>*/}
            {/*        <Text style={styles.titleStyle}>*/}
            {/*          {appContext.userData?.firstName} {appContext.userData?.lastName}*/}
            {/*        </Text>*/}
            {/*      </TouchableOpacity>*/}
            {/*      <TouchableOpacity onPress={onSocialMediaPress}>*/}
            {/*        <View style={styles.socialMediaStyle}>*/}
            {/*          <View style={styles.horizontalContentStyle}>*/}
            {/*            <View style={styles.betweenStyle}>*/}
            {/*              <View style={styles.horizontalContentStyle}>*/}
            {/*                <Ionicons name='logo-youtube'*/}
            {/*                          size={20}*/}
            {/*                          color={Colors.secondaryColor}/>*/}
            {/*                <Text style={styles.countStyle}>*/}
            {/*                  {formatNumber(youtubeCount)}*/}
            {/*                </Text>*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*            <View style={styles.betweenStyle}>*/}
            {/*              <View style={styles.horizontalContentStyle}>*/}
            {/*                <Ionicons name='logo-facebook'*/}
            {/*                          size={20}*/}
            {/*                          color={Colors.secondaryColor}/>*/}
            {/*                <Text style={styles.countStyle}>*/}
            {/*                  {formatNumber(facebookCount)}*/}
            {/*                </Text>*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*            <View style={styles.betweenStyle}>*/}
            {/*              <View style={styles.horizontalContentStyle}>*/}
            {/*                <Ionicons name='logo-instagram'*/}
            {/*                          size={20}*/}
            {/*                          color={Colors.secondaryColor}/>*/}
            {/*                <Text style={styles.countStyle}>*/}
            {/*                  {formatNumber(instagramCount)}*/}
            {/*                </Text>*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*            <View style={styles.betweenStyle}>*/}
            {/*              <View style={styles.horizontalContentStyle}>*/}
            {/*                <MaterialCommunityIcons name='music-note'*/}
            {/*                                        size={20}*/}
            {/*                                        color={Colors.secondaryColor}/>*/}
            {/*                <Text style={styles.tiktokCountStyle}>*/}
            {/*                  {formatNumber(tiktokCount)}*/}
            {/*                </Text>*/}
            {/*              </View>*/}
            {/*            </View>*/}
            {/*          </View>*/}
            {/*        </View>*/}
            {/*      </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*  </View>*/}
            {/*</View>*/}

            {/*Ag - Stats*/}

            {/*<View style={styles.rowViewStyle}>*/}

            {/*  /!*AG*!/*/}
            {/*  <View style={styles.horizontalContentStyle}>*/}

            {/*    <View style={styles.rankCardStyle}>*/}
            {/*      <Text style={styles.rankTitleStyle}>*/}
            {/*        Rank*/}
            {/*      </Text>*/}
            {/*      <Text style={styles.rankValueStyle}>*/}
            {/*        {formatNumber(rank)}*/}
            {/*      </Text>*/}
            {/*    </View>*/}

            {/*    <View style={styles.pointsViewStyle}>*/}
            {/*      <Text style={styles.pointsValueStyle}>*/}
            {/*        {formatNumber(points)}*/}
            {/*      </Text>*/}
            {/*      <View style={styles.horizontalContentStyle}>*/}
            {/*        <Ionicons name='star'*/}
            {/*                  size={20}*/}
            {/*                  color={Colors.secondaryColor}/>*/}
            {/*        <Text style={styles.pointsTitleStyle}>*/}
            {/*          VP Points*/}
            {/*        </Text>*/}
            {/*      </View>*/}
            {/*    </View>*/}


            {/*  </View>*/}
            {/*</View>*/}

            {/*<View style={styles.rowViewStyle}>*/}
            {/*  <View style={styles.horizontalContentStyle}>*/}
            {/*    <View style={styles.circleViewStyle}>*/}
            {/*      <TouchableOpacity style={styles.circleStyle}*/}
            {/*                        onPress={onNewProjectsPress}>*/}
            {/*        <Text style={styles.circleTextStyle}>*/}
            {/*          {formatNumber(pendingProjectCount)}*/}
            {/*        </Text>*/}
            {/*      </TouchableOpacity>*/}
            {/*      <TouchableOpacity onPress={onNewProjectsPress}>*/}
            {/*        <Text style={styles.circleTitleStyle}>*/}
            {/*          Job{'\n'}Pool*/}
            {/*        </Text>*/}
            {/*      </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*    <View style={styles.circleViewStyle}>*/}
            {/*      <TouchableOpacity style={styles.circleStyle}*/}
            {/*                        onPress={onOngoingProjectsPress}>*/}
            {/*        <Text style={styles.circleTextStyle}>*/}
            {/*          {formatNumber(ongoingProjectCount)}*/}
            {/*        </Text>*/}
            {/*      </TouchableOpacity>*/}
            {/*      <TouchableOpacity onPress={onOngoingProjectsPress}>*/}
            {/*        <Text style={styles.circleTitleStyle}>*/}
            {/*          Ongoing{'\n'}Jobs*/}
            {/*        </Text>*/}
            {/*      </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*    <View style={styles.circleViewStyle}>*/}
            {/*      <TouchableOpacity style={styles.circleStyle}*/}
            {/*                        onPress={onCompletedProjectsPress}>*/}
            {/*        <Text style={styles.circleTextStyle}>*/}
            {/*          {formatNumber(completedProjectCount)}*/}
            {/*        </Text>*/}
            {/*      </TouchableOpacity>*/}
            {/*      <TouchableOpacity onPress={onCompletedProjectsPress}>*/}
            {/*        <Text style={styles.circleTitleStyle}>*/}
            {/*          Completed{'\n'}Jobs*/}
            {/*        </Text>*/}
            {/*      </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*  </View>*/}
            {/*</View>*/}
            {/*<TouchableOpacity style={styles.cardStyle}*/}
            {/*                  onPress={onCompletedProjectsPress}>*/}
            {/*  <View style={styles.horizontalContentStyle1}>*/}
            {/*    <FontAwesome name='dollar'*/}
            {/*                 size={20}*/}
            {/*                 color={Colors.primaryColor}/>*/}
            {/*    <Text style={styles.cardTitleStyle}>*/}
            {/*      Total Earnings*/}
            {/*    </Text>*/}
            {/*  </View>*/}
            {/*  <View style={styles.horizontalContentStyle2}>*/}
            {/*    <Text style={styles.earnedAmountStyle}>*/}
            {/*      {formatNumber(totalEarnings)}*/}
            {/*    </Text>*/}
            {/*    <Text style={styles.unitStyle}>*/}
            {/*      LKR*/}
            {/*    </Text>*/}
            {/*  </View>*/}
            {/*  <View style={styles.horizontalContentStyle}>*/}
            {/*    <Text style={styles.cardTextStyle}>*/}
            {/*      View All*/}
            {/*    </Text>*/}
            {/*    <FontAwesome5 name='chevron-circle-right'*/}
            {/*                  size={16}*/}
            {/*                  color={Colors.primaryColor}/>*/}
            {/*  </View>*/}
            {/*</TouchableOpacity>*/}


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
