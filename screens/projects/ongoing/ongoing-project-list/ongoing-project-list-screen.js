import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import Colors from '../../../../shared/const/colors'
import {showAlert} from '../../../../shared/util/helpers'
import {projectStatusEnum} from '../../../../shared/const/enums'
import Constants from '../../../../shared/const/constants'
import Menu from '../../../../components/header/menu-button/menu-button'
import CombinedButtons from '../../../../components/header/combined-buttons/combined-buttons'
import ProjectListItem from '../../../../components/lists/project-list-item/project-list-item'

const OngoingProjectListScreen = props => {
  const [ongoingProjects, setOngoingProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    axios.get(`project-cc-strategy?status=${projectStatusEnum.Ongoing}`).then(async response => {
      setLoading(false)
      if (response.status === 200)
        setOngoingProjects(response.data.data)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get(`project-cc-strategy?status=${projectStatusEnum.Ongoing}`).then(async response => {
      if (response.status === 200)
        setOngoingProjects(response.data.data)
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

  const refreshFunction = async () => {
    setRefresh(true)
  }

  const renderItemsFunction = itemData => {
    return (
      <ProjectListItem navigation={props.navigation}
                       itemData={itemData}
                       screen='OngoingProjectDetails'
                       refreshFunction={refreshFunction}/>
    )
  }

  return (
    <View style={styles.mainViewStyle}>
      {
        ongoingProjects.length > 0 ? (
          <View style={styles.listStyle}>
            <FlatList keyExtractor={(item, index) => index.toString()}
                      data={ongoingProjects}
                      numColumns={1}
                      renderItem={renderItemsFunction}
                      refreshControl={
                        <RefreshControl refreshing={refreshing}
                                        onRefresh={onRefresh}/>
                      }/>
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
      {
        loading &&
        <View style={styles.loadingStyle}>
          <ActivityIndicator size='large'
                             color={Colors.secondaryColor}/>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  emptyListStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  errorMessageStyle: {
    color: Colors.tertiaryColor,
    fontSize: 18
  },
  listStyle: {
    width: wp('95%'),
    marginTop: hp('1%'),
    marginBottom: hp('7%')
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
    alignItems: 'center',
    minHeight: hp('100%')
  },
  reloadMessageStyle: {
    color: Colors.primaryColor,
    fontSize: 16,
    marginTop: hp('1%')
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

OngoingProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Ongoing Jobs',
    headerLeft: () => (
      <Menu navigation={navData.navigation}/>
    ),
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default OngoingProjectListScreen
