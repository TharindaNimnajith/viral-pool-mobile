import React, {useContext, useState} from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
import validator from 'validator'
import Colors from '../../shared/colors'
import Constants from '../../shared/constants'
import {Util} from '../../util/util'
import {AppContext} from '../../global/app-context'
import {storeObjectData, storeStringData} from '../../helpers/local-storage'
import {isEmpty} from '../../helpers/common'

const LoginScreen = ({navigation}) => {
  const appContext = useContext(AppContext)

  // For development
  const [email, setEmail] = useState('akalanka@cube360global.com')
  const [password, setPassword] = useState('#Compaq123')

  // For production
  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')

  const [state] = useState('string')
  const [redirectUri] = useState('string')
  const [clientId] = useState('string')
  const [clientName] = useState('string')

  const [emailValid, setEmailValid] = useState(false)
  const [passwordValid, setPasswordValid] = useState(true)
  const [unauthorized, setUnauthorized] = useState(false)

  const onChangeEmail = async email => {
    // noinspection JSUnresolvedFunction
    setEmailValid(validator.isEmail(email.trim()))
    setUnauthorized(false)
    setEmail(email.trim())
  }

  const onChangePassword = async password => {
    setPasswordValid(!await isEmpty(password))
    setUnauthorized(false)
    setPassword(password)
  }

  function isDisabled() {
    return !emailValid || !passwordValid
  }

  const login = async () => {
    axios.post('oauth/mobile-login',
      {
        email: email,
        password: password,
        state: state,
        redirectUri: redirectUri,
        clientId: clientId,
        clientName: clientName
      })
      .then(async response => {
        // noinspection JSUnresolvedVariable
        await storeStringData(Util.ACCESS_TOKEN, response.data.access_token)
        // noinspection JSUnresolvedVariable
        await storeStringData(Util.REFRESH_TOKEN, response.data.refresh_token)
        // noinspection JSUnresolvedVariable
        await appContext.SetAccessToken(response.data.access_token)
        // noinspection JSUnresolvedVariable
        await appContext.SetRefreshToken(response.data.refresh_token)
        if (response.status === 200) {
          // noinspection JSUnusedLocalSymbols
          axios.get('User')
            .then(async response => {
              if (response.status === 200) {
                await storeObjectData(Util.USER_DATA, response.data.data)
                await appContext.SetUserData(response.data.data)
                navigation.navigate({
                  routeName: 'Navigator'
                })
              } else {
                setUnauthorized(true)
              }
            })
            .catch(error => {
              setUnauthorized(true)
              console.log(error)
            })
        } else {
          setUnauthorized(true)
        }
      })
      .catch(error => {
        setUnauthorized(true)
        console.log(error)
      })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>
              Email
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={email => onChangeEmail(email)}
                       value={email}
                       placeholder='Enter Email'
                       textContentType={'emailAddress'}
                       placeholderTextColor={Colors.tertiaryColor}
                       secureTextEntry={false}/>
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
            {
              unauthorized ? (
                <View style={styles.viewStyle}>
                  <Text style={styles.errorTextStyle}>
                    {Constants.LOGIN_ERROR}
                  </Text>
                </View>
              ) : null
            }
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

LoginScreen.navigationOptions = () => {
  return {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
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
  buttonDisabledStyle: {
    marginTop: 30,
    backgroundColor: Colors.disabledColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5,
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
  errorTextStyle: {
    color: Colors.errorColor
  },
  labelStyle: {
    marginLeft: 40,
    marginTop: 20,
    color: Colors.primaryColor,
    alignSelf: 'baseline'
  },
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
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
  viewStyle: {
    marginTop: 40
  }
})

export default LoginScreen
