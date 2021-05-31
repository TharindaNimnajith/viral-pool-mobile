import React, {useCallback, useState} from 'react'
import {
  ActivityIndicator,
  Image,
  ImageBackground,
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
import Colors from '../../shared/const/colors'
import Constants from '../../shared/const/constants'
import {showAlert, showErrors} from '../../shared/util/helpers'
import {storeStringData} from '../../shared/util/local-storage'

const LoginScreen = props => {
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

  const forgotPassword = async () => {
    props.navigation.navigate({
      routeName: 'ForgotPassword'
    })
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
      await storeStringData(Constants.REFRESH_TOKEN, response.data.refresh_token)
      if (response.status === 200) {
        props.navigation.navigate({
          routeName: 'Navigator'
        })
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.LOGIN_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
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
          <ImageBackground style={styles.image}
                           source={require('../../assets/background/background.png')}>
            <View style={styles.containerStyle}>
              <View style={styles.headerStyle}>
                <Image style={styles.imageStyle}
                       source={require('../../assets/logo/login-logo.png')}/>
                <Text style={styles.textStyle}>
                  {Constants.DESCRIPTION}
                </Text>
                {/*<Text style={styles.titleStyle}>*/}
                {/*  Sign in*/}
                {/*</Text>*/}
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
              <TouchableOpacity onPress={forgotPassword}
                                style={styles.forgotPasswordStyle}>
                <Text style={styles.forgotPasswordLabelStyle}>
                  Forgot password?
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={isDisabled() ? styles.buttonDisabledStyle : styles.buttonStyle}
                                disabled={isDisabled()}
                                onPress={login}>
                <Text style={styles.buttonTextStyle}>
                  Sign in
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
          </ImageBackground>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 30,
    marginBottom: 20,
    backgroundColor: Colors.defaultColor,
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
    justifyContent: 'center',
    flexDirection: 'column'
  },
  forgotPasswordLabelStyle: {
    color: Colors.secondaryColor,
    marginRight: 5
  },
  forgotPasswordStyle: {
    marginRight: 40,
    marginTop: 20,
    alignSelf: 'flex-end'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  imageStyle: {
    width: 140,
    height: 140,
    marginBottom: 20,
    marginTop: 20
  },
  headerStyle: {
    alignItems: 'center',
    marginBottom: 15
  },
  labelStyle: {
    marginLeft: 40,
    marginTop: 20,
    color: Colors.secondaryColor,
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
    // minHeight: hp('100%'),
    // padding: 20,
    minHeight: hp('103.5%'),
    backgroundColor: Colors.primaryColor
  },
  refreshStyle: {
    marginTop: 10
  },
  textInputStyle: {
    backgroundColor: Colors.secondaryColor,
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
    color: Colors.secondaryColor,
    textAlign: 'center',
    lineHeight: 22
  },
  titleStyle: {
    textTransform: 'uppercase',
    color: Colors.secondaryColor,
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
