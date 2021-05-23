import React, {useContext} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import {AppContext} from '../../shared/global/app-context'
import Colors from '../../shared/const/colors'
import CustomHeaderButton from './custom-header-button'

const NotificationButton = props => {
  const appContext = useContext(AppContext)

  const displayNotifications = async () => {
    await appContext.SetNewNotifications(false)
    props.navigation.navigate('Notifications')
  }

  return (
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
                iconName='notifications'
                IconComponent={Ionicons}
                color={Colors.secondaryColor}
                onPress={displayNotifications}/>
        )
      }
    </HeaderButtons>
  )
}

export default NotificationButton
