import React, {useCallback, useContext, useState} from 'react'
import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
import validator from 'validator'
import {AppContext} from '../../shared/global/app-context'
import Colors from '../../shared/const/colors'
import Constants from '../../shared/const/constants'
import {showAlert} from '../../shared/util/helpers'
import {storeStringData} from '../../shared/util/local-storage'

const LoginScreen = props => {
  const appContext = useContext(AppContext)

  const [email, setEmail] = useState('tharindarajapakshe@y7mail.com')
  const [password, setPassword] = useState('tharinda')
  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  const onChangeEmail = async email => {
    setEmailValid(validator.isEmail(email.trim()))
    setEmail(email.trim())
  }

  const onChangePassword = async password => {
    setPasswordValid(password.length > 0)
    setPassword(password)
  }

  function isDisabled() {
    return !emailValid || !passwordValid
  }

  const login = async () => {
    setLoading(true)
    const data = {
      email: email,
      password: password,
      state: Constants.DUMMY_STRING,
      redirectUri: Constants.DUMMY_STRING,
      clientId: Constants.DUMMY_STRING,
      clientName: Constants.DUMMY_STRING
    }
    axios.post('oauth/mobile-login', data).then(async response => {
      await storeStringData(Constants.ACCESS_TOKEN, response.data.access_token)
      await appContext.SetAccessToken(response.data.access_token)
      await appContext.SetRefreshToken(response.data.refresh_token)
      if (response.status === 200) {
        axios.get('User').then(async response => {
          if (response.status === 200) {
            await appContext.SetUserData(response.data.data)
            props.navigation.navigate({
              routeName: 'Navigator'
            })
          } else {
            setLoading(false)
            await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
          }
        }).catch(async error => {
          setLoading(false)
          await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
          console.log(error)
        })
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.LOGIN_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.LOGIN_ERROR)
      console.log(error)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.refreshStyle}
                  refreshControl={
                    <RefreshControl refreshing={refreshing}
                                    onRefresh={onRefresh}/>
                  }>
        <View style={styles.mainViewStyle}>
          <View style={styles.containerStyle}>
            <View style={styles.headerStyle}>
              <Image style={styles.imageStyle}
                     source={require('../../assets/login-logo.png')}/>
              <Text style={styles.textStyle}>
                {Constants.DESCRIPTION}
              </Text>
              <Text style={styles.titleStyle}>
                Login
              </Text>
            </View>
            <Text style={styles.labelStyle}>
              Email
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={email => onChangeEmail(email)}
                       value={email}
                       placeholder='Enter Email'
                       textContentType={'emailAddress'}
                       placeholderTextColor={Colors.tertiaryColor}/>
            <Text style={styles.labelStyle}>
              Password
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={password => onChangePassword(password)}
                       value={password}
                       placeholder='Enter Password'
                       placeholderTextColor={Colors.tertiaryColor}
                       secureTextEntry={true}/>
            <TouchableOpacity style={isDisabled() ? styles.buttonDisabledStyle : styles.buttonStyle}
                              disabled={isDisabled()}
                              onPress={login}>
              <Text style={styles.buttonTextStyle}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          {
            loading &&
            <View style={styles.loadingStyle}>
              <ActivityIndicator size='large'
                                 color={Colors.secondaryColor}/>
            </View>
          }
        </View>
      </ScrollView>
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
  buttonDisabledStyle: {
    marginTop: 30,
    backgroundColor: Colors.tertiaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase'
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    marginBottom: 25,
    width: 160,
    height: 160
  },
  headerStyle: {
    alignItems: 'center',
    marginBottom: 15
  },
  labelStyle: {
    marginLeft: 40,
    marginTop: 20,
    color: Colors.primaryColor,
    alignSelf: 'baseline'
  },
  loadingStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blurEffectColor
  },
  mainViewStyle: {
    height: hp('102.2%'),
    backgroundColor: Colors.secondaryColor
  },
  refreshStyle: {
    marginTop: 10
  },
  textInputStyle: {
    borderColor: Colors.primaryColor,
    width: wp('80%'),
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginTop: 10,
    padding: 10,
    color: Colors.tertiaryColor
  },
  textStyle: {
    width: wp('70%'),
    color: Colors.tertiaryColor,
    textAlign: 'center',
    lineHeight: 20
  },
  titleStyle: {
    textTransform: 'uppercase',
    color: Colors.primaryColor,
    marginTop: hp('5%'),
    fontSize: 30
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

LoginScreen.navigationOptions = () => {
  return {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
}

export default LoginScreen
