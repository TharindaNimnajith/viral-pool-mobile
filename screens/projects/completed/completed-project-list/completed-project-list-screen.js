import React, {useCallback, useEffect, useState} from 'react'
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
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import Colors from '../../../../shared/const/colors'
import {formatNumber, showAlert} from '../../../../shared/util/helpers'
import Constants from '../../../../shared/const/constants'
import Menu from '../../../../components/header/menu-button/menu-button'
import CombinedButtons from '../../../../components/header/combined-buttons/combined-buttons'
import ProjectListItem from '../../../../components/lists/project-list-item/project-list-item'
import {styles} from './completed-project-list-screen-styles'

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
