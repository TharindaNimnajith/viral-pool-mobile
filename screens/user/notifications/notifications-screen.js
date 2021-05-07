import React, {useCallback, useState} from 'react'
import {FlatList, RefreshControl, StyleSheet, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../util/colors'
import {Notifications} from '../../../data/notification-data/notification-data'
import Menu from '../../../components/buttons/menu-button'
import CombinedButtons from '../../../components/buttons/combined-buttons'
import NotificationListItem from '../../../components/list-items/notification-list-item'

const NotificationsScreen = props => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const renderItemsFunction = itemData => {
    return (
      <NotificationListItem navigation={props.navigation}
                            itemData={itemData}/>
    )
  }

  return (
    <View style={styles.mainViewStyle}>
      <View style={styles.listStyle}>
        <FlatList keyExtractor={(item, index) => index.toString()}
                  data={Notifications}
                  numColumns={1}
                  renderItem={renderItemsFunction}
                  refreshControl={
                    <RefreshControl refreshing={refreshing}
                                    onRefresh={onRefresh}/>
                  }/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listStyle: {
    width: wp('95%'),
    marginTop: 10,
    marginBottom: 10
  },
  mainViewStyle: {
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center'
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

NotificationsScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Notifications',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default NotificationsScreen
