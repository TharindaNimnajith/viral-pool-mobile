import React, {useContext} from 'react'
import {View} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {AppContext} from '../../../shared/global/app-context'
import Colors from '../../../shared/const/colors'
import CustomHeaderButton from '../custom-header-button/custom-header-button'
import {styles} from './notification-button-styles'

const NotificationButton = props => {
  const appContext = useContext(AppContext)

  const displayNotifications = async () => {
    await appContext.SetNewNotifications(false)
    props.navigation.navigate('Notifications')
  }

  return (
    <View style={styles.iconStyle}>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        {
          appContext.newNotifications ? (
            <Item title='New Notifications'
                  iconName='bell-alert'
                  IconComponent={MaterialCommunityIcons}
                  color={Colors.secondaryColor}
                  onPress={displayNotifications}/>
          ) : (
            <Item title='Notifications'
                  iconName='bell'
                  IconComponent={MaterialCommunityIcons}
                  color={Colors.secondaryColor}
                  onPress={displayNotifications}/>
          )
        }
      </HeaderButtons>
    </View>
  )
}

export default NotificationButton
