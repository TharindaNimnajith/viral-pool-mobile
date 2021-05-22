import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../util/colors'

const IdeaListItem = props => {
  const idea = {
    idea: props.itemData.item.id,
    navigation: props.navigation,
    refresh: props.refreshFunction
  }

  const redirectToDetailsScreen = () => {
    props.navigation.navigate('EditIdea', {idea})
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={redirectToDetailsScreen}>
      <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>
          {props.itemData.item.title}
        </Text>
        {
          props.itemData.item.description.length < 100 ? (
            <Text style={styles.textStyle}>
              {props.itemData.item.description}
            </Text>
          ) : (
            <Text style={styles.textStyle}>
              {props.itemData.item.description.substring(0, 96)}...
            </Text>
          )
        }
        <Text>
          Posted on {props.itemData.item.createdDate.slice(0, 10)}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  itemStyle: {
    padding: 15,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginHorizontal: wp('4%'),
    height: 90,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    marginTop: 6,
    marginBottom: 6,
    alignContent: 'center'
  },
  textStyle: {
    color: Colors.tertiaryColor,
    fontSize: 15,
    marginTop: 3,
    marginBottom: 3
  },
  titleStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: Colors.primaryColor
  },
  viewStyle: {
    width: wp('80%')
  }
})

export default IdeaListItem
