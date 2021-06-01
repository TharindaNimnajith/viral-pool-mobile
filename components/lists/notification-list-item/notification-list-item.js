import React, {useState} from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {FontAwesome5, Ionicons} from '@expo/vector-icons'
import {notificationTypeEnum} from '../../../shared/const/enums'
import Colors from '../../../shared/const/colors'
import {styles} from './notification-list-item-styles'

const NotificationListItem = props => {
  const project = {
    project: props.itemData.item.strategyId,
    refresh: props.refreshFunction
  }

  const [type] = useState(props.itemData.item.notificationType)

  const pressNotification = async () => {
    props.navigation.navigate('NotificationProjectDetails', {project})
  }

  return (
    <TouchableOpacity onPress={pressNotification}
                      style={
                        type === notificationTypeEnum.NewJob ? styles.itemNewJobStyle :
                          type === notificationTypeEnum.ContentAccepted ? styles.itemContentAcceptedStyle :
                            type === notificationTypeEnum.ContentRejected ? styles.itemContentRejectedStyle :
                              type === notificationTypeEnum.ResultAccepted ? styles.itemResultAcceptedStyle :
                                type === notificationTypeEnum.ResultRejected ? styles.itemResultRejectedStyle :
                                  type === notificationTypeEnum.PaymentAdded ? styles.itemPaymentAddedStyle :
                                    styles.itemDefaultStyle
                      }>
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

export default NotificationListItem
