import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import {NewProjects} from '../../../data/project-data/new-project-data'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import ProjectListItem from '../../../components/list-items/project-list-item'

const NewProjectListScreen = ({navigation}) => {
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
    <View style={styles.mainViewStyle}>
      <View style={styles.listStyle}>
        <FlatList keyExtractor={(item, index) => index.toString()}
                  data={NewProjects}
                  numColumns={1}
                  renderItem={renderItemsFunction}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listStyle: {
    width: wp('95%'),
    marginTop: 10,
    marginBottom: 10
  },
  mainViewStyle: {
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center'
  }
})

NewProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Job Pool',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default NewProjectListScreen
