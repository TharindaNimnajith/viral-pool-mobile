import React, {useCallback, useEffect, useState} from 'react'
import {ActivityIndicator, FlatList, RefreshControl, StyleSheet, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
import Colors from '../../../util/colors'
import {showAlert} from '../../../util/common-helpers'
import Constants from '../../../util/constants'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import ProjectListItem from '../../../components/list-items/project-list-item'

const OngoingProjectListScreen = props => {
  const [ongoingProjects, setOngoingProjects] = useState([])
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    setLoading(true)
    axios.get('project-cc-strategy?status=1').then(async response => {
      if (response.status === 200) {
        setOngoingProjects(response.data.data)
        setLoading(false)
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.UNEXPECTED_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.UNEXPECTED_ERROR)
      console.log(error)
    })
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const renderItemsFunction = itemData => {
    return (
      <ProjectListItem navigation={props.navigation}
                       itemData={itemData}
                       screen='OngoingProjectDetails'/>
    )
  }

  return (
    <View style={styles.mainViewStyle}>
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
  listStyle: {
    width: wp('95%'),
    marginTop: 10,
    marginBottom: 15
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
    minHeight: hp('95%')
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
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default OngoingProjectListScreen
