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
import {Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import Colors from '../../shared/const/colors'
import {showAlert} from '../../shared/util/helpers'
import Constants from '../../shared/const/constants'
import Menu from '../../components/header/menu-button'
import CombinedButtons from '../../components/header/combined-buttons'
import ProjectListItem from '../../components/list-items/project-list-item'

const EarningsScreen = props => {
  const [completedProjects, setCompletedProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    axios.get('project-cc-strategy?status=2').then(async response => {
      setLoading(false)
      setRefresh(false)
      if (response.status === 200)
        setCompletedProjects(response.data.data)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      setLoading(false)
      setRefresh(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get('project-cc-strategy?status=2').then(async response => {
      if (response.status === 200)
        setCompletedProjects(response.data.data)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
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
            <TouchableOpacity style={styles.cardStyle}>
              <Text style={styles.cardTitleStyle}>
                Net Income
              </Text>
              <View style={styles.horizontalContentStyle}>
                <Text style={styles.earnedAmountStyle}>
                  54,000
                </Text>
                <Text style={styles.unitStyle}>
                  LKR
                </Text>
              </View>
              <View style={styles.lineStyle}/>
              <Text style={styles.cardTitleStyle}>
                Pending Income
              </Text>
              <View style={styles.horizontalContentStyle}>
                <Text style={styles.earnedAmountStyle}>
                  54,000
                </Text>
                <Text style={styles.unitStyle}>
                  LKR
                </Text>
              </View>
              <View style={styles.lineStyle}/>
              <Text style={styles.cardTitleStyle}>
                Total Top-ups
              </Text>
              <View style={styles.horizontalContentStyle}>
                <Text style={styles.earnedAmountStyle}>
                  54,000
                </Text>
                <Text style={styles.unitStyle}>
                  LKR
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyStyle}>
            <Text style={styles.sectionTitleStyle}>
              Completed Jobs
            </Text>
            <View style={styles.listStyle}>
              {
                completedProjects.length > 0 ? (
                  <View>
                    <FlatList keyExtractor={(item, index) => index.toString()}
                              data={completedProjects}
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
  bodyStyle: {
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
  cardTitleStyle: {
    fontSize: 24,
    marginTop: hp('2%'),
    marginBottom: hp('1%')
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
  lineStyle: {
    height: 1.5,
    width: wp('60%'),
    backgroundColor: Colors.defaultColor,
    marginVertical: hp('1.5%')
  },
  listStyle: {
    marginTop: hp('2.5%'),
    backgroundColor: Colors.fadedEffectColor,
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
    backgroundColor: Colors.secondaryColor
  },
  reloadMessageStyle: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginTop: 10
  },
  sectionTitleStyle: {
    fontSize: 22,
    marginLeft: 10,
    marginVertical: hp('1%')
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

EarningsScreen.navigationOptions = navData => {
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

export default EarningsScreen
