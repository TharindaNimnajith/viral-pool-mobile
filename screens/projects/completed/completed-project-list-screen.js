import React, {useCallback, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import Colors from '../../../shared/const/colors'
import {formatNumber, showAlert} from '../../../shared/util/helpers'
import Constants from '../../../shared/const/constants'
import Menu from '../../../components/header/menu-button'
import CombinedButtons from '../../../components/header/combined-buttons'
import ProjectListItem from '../../../components/list-items/project/project-list-item'

const CompletedProjectListScreen = props => {
  const [completedProjects, setCompletedProjects] = useState([])
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [pendingEarnings, setPendingEarnings] = useState(0)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    axios.get('project-cc-strategy/earnings').then(async response => {
      setLoading(false)
      if (response.status === 200) {
        setCompletedProjects(response.data.data.creatorsStrategySummaryResponses)
        setTotalEarnings(response.data.data.totalEarnings)
        setPendingEarnings(response.data.data.pendingEarnings)
      } else {
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
    axios.get('project-cc-strategy/earnings').then(async response => {
      if (response.status === 200) {
        setCompletedProjects(response.data.data.creatorsStrategySummaryResponses)
        setTotalEarnings(response.data.data.totalEarnings)
        setPendingEarnings(response.data.data.pendingEarnings)
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
                       screen='CompletedProjectDetails'
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
          <View style={styles.headerStyle}>
            <View style={styles.cardStyle}>
              <View style={styles.iconViewStyle}>
                <FontAwesome name='dollar'
                             size={28}
                             color={Colors.primaryColor}/>
                <Text style={styles.cardTitleStyle}>
                  Total Earnings
                </Text>
              </View>
              <View style={styles.horizontalContentStyle}>
                <Text style={styles.totalAmountStyle}>
                  {formatNumber(totalEarnings)}
                </Text>
                <Text style={styles.totalUnitStyle}>
                  LKR
                </Text>
              </View>
              <View style={styles.lineStyle}/>
              <View style={styles.iconViewStyle}>
                <FontAwesome name='dollar'
                             size={28}
                             color={Colors.primaryColor}/>
                <Text style={styles.cardTitleStyle}>
                  Pending Earnings
                </Text>
              </View>
              <View style={styles.horizontalContentStyle}>
                <Text style={styles.pendingAmountStyle}>
                  {formatNumber(pendingEarnings)}
                </Text>
                <Text style={styles.pendingUnitStyle}>
                  LKR
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.bodyStyle}>
            <View style={styles.listStyle}>
              <Text style={styles.sectionTitleStyle}>
                Completed Jobs
              </Text>
              {
                completedProjects.length > 0 ? (
                  <FlatList keyExtractor={(item, index) => index.toString()}
                            data={completedProjects}
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

const styles = StyleSheet.create({
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
    justifyContent: 'center'
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

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

CompletedProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Earnings',
    headerLeft: () => (
      <Menu navigation={navData.navigation}/>
    ),
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default CompletedProjectListScreen
