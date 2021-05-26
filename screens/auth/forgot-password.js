import React, {useCallback, useState} from 'react'
import {RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import {heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Colors from '../../shared/const/colors'

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
          <View style={styles.viewStyle}>
            <Text>Forgot Password</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    minHeight: hp('102.2%'),
    backgroundColor: Colors.secondaryColor
  },
  refreshStyle: {
    marginTop: 10
  },
  viewStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
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
