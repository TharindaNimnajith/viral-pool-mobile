import React, {useContext, useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
// import {AppContext} from '../../../global/app-context'
import Colors from '../../../shared/colors'
// import {CompletedProjects} from '../../../data/project-data/completed-project-data'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import ProjectListItem from '../../../components/list-items/project-list-item'
// import {storeObjectData} from '../../../helpers/local-storage-helpers'
// import {Const} from '../../../util/const'

const CompletedProjectListScreen = ({navigation}) => {
  // const appContext = useContext(AppContext)

  const [refresh, setRefresh] = useState(false)
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    axios.get('project-cc-strategy').then(async response => {
      if (response.status === 200) {
        console.log(response)
        // await storeObjectData(Const.USER_DATA, response.data.data)
        // await appContext.SetUserData(response.data.data)
        // navigation.navigate({
        //   routeName: 'Navigator'
        // })
        setProjects(response.data.data)
      } else {
        // setLoading(false)
        // setUnauthorized(true)
      }
    }).catch(async error => {
      // setLoading(false)
      // setUnauthorized(true)
      console.log(error)
    })
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
                  data={projects}
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

CompletedProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Completed Jobs',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default CompletedProjectListScreen
