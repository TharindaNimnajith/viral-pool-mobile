import React, {useCallback, useState} from 'react'
import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
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
      <View style={styles.viewStyle}>
        <TouchableOpacity style={styles.buttonStyle}
                          onPress={redirectToAddIdeaScreen}>
          <Text style={styles.buttonTextStyle}>
            New Idea
          </Text>
        </TouchableOpacity>
      </View>
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
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 15,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    width: wp('85%'),
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  listStyle: {
    width: wp('95%'),
    marginTop: 65,
    marginBottom: 10
  },
  mainViewStyle: {
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center'
  },
  viewStyle: {
    position: 'absolute'
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
