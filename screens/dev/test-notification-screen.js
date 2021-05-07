import React, {useContext} from 'react'
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import {AppContext} from '../../global/app-context'
import Colors from '../../util/colors'
import {ApiUrl} from '../../util/api-url'
import {Notifications} from '../../data/notification-data/notification-data'
import Menu from '../../components/buttons/menu-button'
import CombinedButtons from '../../components/buttons/combined-buttons'

const TestNotificationScreen = () => {
  const appContext = useContext(AppContext)

  const sendNotification = async () => {
    await sendPushNotification(appContext.expoPushToken)
  }

  return (
    <SafeAreaView>
      <View style={styles.mainViewStyle}>
        <View style={styles.viewStyle}>
          <Text style={styles.textStyle}>
            {appContext.expoPushToken}
          </Text>
          <TouchableOpacity style={styles.buttonStyle}
                            onPress={sendNotification}>
            <Text style={styles.buttonTextStyle}>
              Send Notification
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 30,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  textStyle: {
    marginTop: 20
  },
  viewStyle: {
    alignItems: 'center'
  }
})

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: Notifications[0].title,
    body: Notifications[0].description,
    data: {
      screen: Notifications[0].screen,
      project: Notifications[0].project
    }
  }

  const headers = {
    'Accept': 'application/json',
    'Accept-encoding': 'gzip, deflate',
    'Content-Type': 'application/json'
  }

  await fetch(ApiUrl.EXPO_PUSH_NOTIFICATION_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(message)
  })
}

TestNotificationScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Test Notifications',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default TestNotificationScreen
