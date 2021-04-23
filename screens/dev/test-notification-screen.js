import React, {useContext, useEffect, useState} from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'
import {AppContext} from '../../global/app-context'
import {getStringData} from '../../helpers/local-storage-helpers'
import Menu from '../../components/menu-component'
import Logout from '../../components/logout-component'
import {Util} from '../../util/util'

const TestNotificationScreen = () => {
  const appContext = useContext(AppContext)

  const [expoPushToken, setExpoPushToken] = useState(null)

  useEffect(() => {
    getStringData(Util.EXPO_PUSH_TOKEN).then(value => {
      setExpoPushToken(value)
    })
  }, [])

  const sendNotificationAppContext = async () => {
    await sendPushNotification(appContext.expoPushToken)
  }

  const sendNotificationAsyncStorage = async () => {
    await sendPushNotification(expoPushToken)
  }

  return (
    <View style={styles.mainViewStyle}>
      <TouchableOpacity style={styles.buttonStyle}
                        onPress={sendNotificationAppContext}>
        <Text style={styles.buttonTextStyle}>
          Send Notification (App Context)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonStyle}
                        onPress={sendNotificationAsyncStorage}>
        <Text style={styles.buttonTextStyle}>
          Send Notification (Async Storage)
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 30,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center'
  }
})

async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: 'Test Title',
    body: 'Test viralpool notification body.',
    data: {
      data: 'OngoingProjectDetails'
    }
  }

  await fetch(Util.EXPO_PUSH_NOTIFICATION_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(message)
  })

  // let data = {
  //   "to": "ExponentPushToken[Wr2Q-yKUDUUi6qm0ZavPPM]",
  //   "sound": "default",
  //   "title": "Test Title",
  //   "body": "Test viralpool notification body.",
  //   "data": {
  //     "someData": "OngoingProjectDetails"
  //   }
  // }
  //
  // let config = {
  //   method: 'post',
  //   url: 'https://exp.host/--/api/v2/push/send',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Accept-encoding': 'gzip, deflate',
  //     'Content-Type': 'application/json'
  //   },
  //   data : data
  // }
}

TestNotificationScreen.navigationOptions = navData => {
  return {
    headerTitle: 'TEST NOTIFICATIONS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

// noinspection JSUnusedGlobalSymbols
export default TestNotificationScreen
