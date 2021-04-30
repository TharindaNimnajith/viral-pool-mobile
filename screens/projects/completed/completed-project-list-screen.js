import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import {CompletedProjects} from '../../../data/project-data/completed-project-data'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import ProjectListItem from '../../../components/list-items/project-list-item'

const CompletedProjectListScreen = ({navigation}) => {
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
    <View style={styles.listStyle}>
      <FlatList keyExtractor={(item, index) => index.toString()}
                data={CompletedProjects}
                numColumns={1}
                renderItem={renderItemsFunction}/>
    </View>
  )
}

const styles = StyleSheet.create({
  listStyle: {
    width: wp('100%'),
    backgroundColor: Colors.secondaryColor
  }
})

CompletedProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Completed Projects',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default CompletedProjectListScreen
