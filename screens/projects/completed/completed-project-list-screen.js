import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import {CompletedProjects} from '../../../data/project-data/completed-project-data'
import Menu from '../../../components/buttons/menu-button'
import Logout from '../../../components/buttons/logout-button'
import ProjectItem from '../../../components/list-items/project-item'

const CompletedProjectListScreen = ({navigation}) => {
  let projects = CompletedProjects

  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(false)
  }, [refresh])

  const renderItemsFunction = itemData => {
    return (
      <ProjectItem navigation={navigation}
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

CompletedProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'COMPLETED PROJECTS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default CompletedProjectListScreen
