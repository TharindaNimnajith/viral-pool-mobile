import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import {Ideas} from '../../../data/idea-data/idea-data'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'
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
                  renderItem={renderItemsFunction}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: Colors.primaryColor,
    padding: 10,
    width: wp('40%'),
    borderRadius: 5,
    position: 'absolute',
    alignSelf: 'flex-end',
    alignItems: 'center'
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  listStyle: {
    marginTop: 70,
    width: wp('100%')
  },
  mainViewStyle: {
    backgroundColor: Colors.secondaryColor
  },
  viewStyle: {
    marginRight: 15
  }
})

IdeaListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'My Ideas',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default IdeaListScreen
