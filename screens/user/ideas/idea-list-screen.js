import React, {useCallback, useState} from 'react'
import {FlatList, RefreshControl, StyleSheet, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {Ionicons} from '@expo/vector-icons'
import Colors from '../../../util/colors'
import {Ideas} from '../../../data/idea-data/idea-data'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import IdeaListItem from '../../../components/list-items/idea-list-item'

const IdeaListScreen = props => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const renderItemsFunction = itemData => {
    return (
      <IdeaListItem navigation={props.navigation}
                    itemData={itemData}/>
    )
  }

  const redirectToAddIdeaScreen = () => {
    props.navigation.navigate('AddIdea')
  }

  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.listStyle}>
        <FlatList keyExtractor={(item, index) => index.toString()}
                  data={Ideas}
                  numColumns={1}
                  renderItem={renderItemsFunction}
                  refreshControl={
                    <RefreshControl refreshing={refreshing}
                                    onRefresh={onRefresh}/>
                  }/>
      </View>
      <TouchableOpacity style={styles.buttonStyle}
                        onPress={redirectToAddIdeaScreen}>
        <Ionicons name=''
                  size={30}
                  color={Colors.secondaryColor}/>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: wp('10%'),
    right: wp('10%'),
    height: 70,
    backgroundColor: Colors.primaryColor,
    borderRadius: 35
  },
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

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

IdeaListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Ideas',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default IdeaListScreen
