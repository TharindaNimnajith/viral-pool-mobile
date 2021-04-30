import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import {Ideas} from '../../../data/idea-data/idea-data'
import Menu from '../../../components/buttons/menu-button'
import Logout from '../../../components/buttons/logout-button'
import IdeaListItem from '../../../components/list-items/idea-list-item'

const IdeaListScreen = ({navigation}) => {
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(false)
  }, [refresh])

  const renderItemsFunction = itemData => {
    return (
      <IdeaListItem navigation={navigation}
                    itemData={itemData}
                    refreshFunction={refreshFunction}/>
    )
  }

  const refreshFunction = () => {
    setRefresh(true)
  }

  const redirectToAddIdeaScreen = () => {
    navigation.navigate('AddIdea')
  }

  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.buttonStyle}
                        onPress={redirectToAddIdeaScreen}>
        <Text style={styles.buttonTextStyle}>
          New Idea
        </Text>
      </TouchableOpacity>
      <View style={styles.list}>
        <FlatList keyExtractor={(item, index) => index.toString()}
                  data={Ideas}
                  numColumns={1}
                  renderItem={renderItemsFunction}/>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 30,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  list: {
    width: wp('100%'),
    backgroundColor: Colors.secondaryColor
  }
})

IdeaListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Ideas',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default IdeaListScreen
