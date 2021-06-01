import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {FontAwesome, FontAwesome5, Ionicons} from '@expo/vector-icons'
import Colors from '../../../shared/const/colors'
import {styles} from './idea-list-item-styles'

const IdeaListItem = props => {
  const idea = {
    idea: props.itemData.item.id,
    navigation: props.navigation,
    refresh: props.refreshFunction
  }

  const redirectToDetailsScreen = async () => {
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
          <View style={styles.horizontalStyle}>
            {
              props.itemData.item.comment && (
                <Ionicons name='ios-chatbubble-ellipses'
                          size={15}
                          color={Colors.tertiaryColor}/>
              )
            }
            <Text style={styles.dateStyle}>
              Posted on {props.itemData.item.createdDate.slice(0, 10)}
            </Text>
          </View>
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

export default IdeaListItem
