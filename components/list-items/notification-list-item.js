import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'

const NotificationListItem = props => {
  let notification = {
    notification: props.itemData.item,
    navigation: props.navigation,
    refresh: props.refreshFunction
  }

  const pressNotification = () => {
    const project = notification.notification
    notification.navigation.navigate(notification.notification.screen, {project})
  }

  return (
    <TouchableOpacity style={styles.itemStyle}
                      onPress={pressNotification}>
      <View style={styles.viewStyle}>
        <Text style={styles.titleStyle}>
          {notification.notification.title}
        </Text>
        <Text style={styles.textStyle}>
          {notification.notification.description}
        </Text>
        <Text style={styles.dateStyle}>
          {notification.notification.date}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  dateStyle: {
    color: Colors.tertiaryColor,
    fontSize: 12,
    alignSelf: 'flex-end'
  },
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

export default NotificationListItem
