import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {FontAwesome, FontAwesome5} from '@expo/vector-icons'
import Colors from '../../shared/const/colors'

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
      <View style={styles.mainViewStyle}>
        <View style={styles.iconViewStyle}>
          <FontAwesome name='comments'
                       size={30}
                       color={Colors.primaryColor}/>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.titleStyle}>
            {props.itemData.item.title}
          </Text>
          {
            props.itemData.item.description.length < 80 ? (
              <Text style={styles.textStyle}>
                {props.itemData.item.description}
              </Text>
            ) : (
              <Text style={styles.textStyle}>
                {props.itemData.item.description.substring(0, 76)}...
              </Text>
            )
          }
          <Text style={styles.dateStyle}>
            Posted on {props.itemData.item.createdDate.slice(0, 10)}
          </Text>
        </View>
        <View style={styles.arrowStyle}>
          <FontAwesome5 name='chevron-circle-right'
                        size={16}
                        color={Colors.primaryColor}/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  arrowStyle: {
    justifyContent: 'center',
    marginLeft: 5
  },
  dateStyle: {
    color: Colors.tertiaryColor,
    fontSize: 12
  },
  iconViewStyle: {
    width: wp('10.5%'),
    marginLeft: wp('3%')
  },
  itemStyle: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginHorizontal: wp('4%'),
    height: 110,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    alignContent: 'center',
    marginVertical: 6
  },
  mainViewStyle: {
    flexDirection: 'row',
  },
  textStyle: {
    color: Colors.defaultColor,
    fontSize: 15,
    marginVertical: 7
  },
  titleStyle: {
    fontSize: 17,
    color: Colors.primaryColor
  },
  viewStyle: {
    width: wp('65%')
  }
})

export default IdeaListItem
