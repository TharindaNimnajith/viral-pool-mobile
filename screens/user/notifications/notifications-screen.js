import React, {useEffect, useState} from 'react'
import {FlatList, StyleSheet, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import {Notifications} from '../../../data/notification-data/notification-data'
import Menu from '../../../components/buttons/menu-button'
import Logout from '../../../components/buttons/logout-button'
import NotificationListItem from '../../../components/list-items/notification-list-item'

const NotificationsScreen = ({navigation}) => {
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setRefresh(false)
  }, [refresh])

  const renderItemsFunction = itemData => {
    return (
      <NotificationListItem navigation={navigation}
                            itemData={itemData}
                            refreshFunction={refreshFunction}/>
    )
  }

  const refreshFunction = () => {
    setRefresh(true)
  }

  return (
    <View style={styles.list}>
      <FlatList keyExtractor={(item, index) => index.toString()}
                data={Notifications}
                numColumns={1}
                renderItem={renderItemsFunction}/>
    </View>
  )
}

const styles = StyleSheet.create({
  list: {
    width: wp('100%'),
    backgroundColor: Colors.secondaryColor
  }
})

NotificationsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Notifications',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default NotificationsScreen
