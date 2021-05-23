import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {FontAwesome5, Ionicons} from '@expo/vector-icons'
import Colors from '../../shared/const/colors'

const NotificationListItem = props => {
  const project = {
    project: props.itemData.item.id,
    refresh: props.refreshFunction
  }

  const pressNotification = () => {
    props.navigation.navigate('NotificationProjectDetails', {project})
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={pressNotification}>
      <View style={styles.mainViewStyle}>
        <View style={styles.iconViewStyle}>
          <Ionicons name='notifications'
                    size={30}
                    color={Colors.primaryColor}/>
        </View>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>
            {props.itemData.item.notification}
          </Text>
          <Text style={styles.dateStyle}>
            {props.itemData.item.createdDate.slice(0, 10)}
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
    marginLeft: 8
  },
  dateStyle: {
    color: Colors.tertiaryColor,
    fontSize: 12,
    alignSelf: 'flex-end',
    marginRight: 5
  },
  iconViewStyle: {
    width: wp('10.5%'),
    marginLeft: wp('3%'),
    marginBottom: 12,
    justifyContent: 'center'
  },
  itemStyle: {
    elevation: 5,
    borderRadius: 10,
    backgroundColor: Colors.secondaryColor,
    marginHorizontal: wp('4%'),
    height: 75,
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
    fontSize: 15,
    color: Colors.defaultColor
  },
  viewStyle: {
    width: wp('64%')
  }
})

export default NotificationListItem
