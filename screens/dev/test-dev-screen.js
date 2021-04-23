import React, {useContext, useEffect, useState} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../shared/colors'
import {AppContext} from '../../global/app-context'
import Menu from '../../components/menu-button'
import Logout from '../../components/logout-button'
import {getStringData} from '../../helpers/local-storage-helpers'
import {Util} from '../../util/util'

const TestDevScreen = () => {
  const appContext = useContext(AppContext)

  const [accessToken, setAccessToken] = useState(null)
  const [refreshToken, setRefreshToken] = useState(null)
  const [expoPushToken, setExpoPushToken] = useState(null)

  useEffect(() => {
    getStringData(Util.ACCESS_TOKEN).then(value => {
      setAccessToken(value)
    })
    getStringData(Util.REFRESH_TOKEN).then(value => {
      setRefreshToken(value)
    })
    getStringData(Util.EXPO_PUSH_TOKEN).then(value => {
      setExpoPushToken(value)
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <Text style={styles.textStyle}>
            Access Token (AppContext): {appContext.accessToken}
          </Text>
          <Text style={styles.textStyle}>
            Refresh Token (AppContext): {appContext.refreshToken}
          </Text>
          <Text style={styles.textStyle}>
            Expo Push Token (AppContext): {appContext.expoPushToken}
          </Text>
          <Text style={styles.textStyle}>
            Access Token (AsyncStorage): {accessToken}
          </Text>
          <Text style={styles.textStyle}>
            Refresh Token (AsyncStorage): {refreshToken}
          </Text>
          <Text style={styles.textStyle}>
            Expo Push Token (AsyncStorage): {expoPushToken}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  textStyle: {
    marginTop: 15,
    marginRight: 15,
    marginLeft: 15
  }
})

TestDevScreen.navigationOptions = navData => {
  return {
    headerTitle: 'TEST DEV',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

// noinspection JSUnusedGlobalSymbols
export default TestDevScreen
