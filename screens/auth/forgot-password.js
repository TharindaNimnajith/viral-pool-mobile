import React, {useCallback, useState} from 'react'
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import WebView from 'react-native-webview'
import Colors from '../../shared/const/colors'
import {ApiUrl} from '../../shared/util/helpers'

const ForgotPasswordScreen = () => {
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView style={styles.refreshStyle}
                  refreshControl={
                    <RefreshControl refreshing={refreshing}
                                    onRefresh={onRefresh}/>
                  }>
        <View style={styles.mainViewStyle}>
          <WebView style={styles.webViewStyle}
                   source={{
                     uri: `${ApiUrl.ROOT_URL}Identity365/PasswordResetEmail`
                   }}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    minHeight: hp('102.2%'),
    backgroundColor: Colors.primaryColor
  },
  refreshStyle: {
    marginTop: 10
  },
  webViewStyle: {
    marginTop: 12,
    marginHorizontal: 15
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

ForgotPasswordScreen.navigationOptions = () => {
  return {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
}

export default ForgotPasswordScreen
