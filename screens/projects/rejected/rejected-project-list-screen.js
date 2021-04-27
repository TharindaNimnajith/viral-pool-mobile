import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import {RejectedProjects} from '../../../data/project-data/rejected-project-data'
import Menu from '../../../components/buttons/menu-button'
import Logout from '../../../components/buttons/logout-button'
import ProjectListItem from '../../../components/list-items/project-list-item'

const RejectedProjectListScreen = ({navigation}) => {
  let projects = RejectedProjects

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(false)
  }, [refresh])

  const renderItemsFunction = itemData => {
    return (
      <ProjectListItem navigation={navigation}
                       itemData={itemData}
                       refreshFunction={refreshFunction}/>
    )
  }

  const refreshFunction = () => {
    setRefresh(true)
  }

  return (
    <View style={styles.list}>
      <FlatList keyExtractor={(item, index) => index.toString()}
                data={projects}
                numColumns={1}
                renderItem={renderItemsFunction}/>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 5,
    width: wp('100%'),
    backgroundColor: Colors.secondaryColor
  }
})

RejectedProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'REJECTED PROJECTS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

// noinspection JSUnusedGlobalSymbols
export default RejectedProjectListScreen
