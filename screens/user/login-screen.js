import React, {useContext, useState} from 'react'
import {Animated, Button, ScrollView, StyleSheet, Text, TextInput, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
import validator from 'validator'
import Colors from '../../shared/colors'
import Constants from '../../shared/constants'
import {Util} from '../../util/util'
import {AppContext} from '../../global/app-context'
import {storeStringData} from '../../helpers/local-storage'
import {isEmpty} from '../../helpers/common'

const LoginScreen = ({navigation}) => {
  const appContext = useContext(AppContext)

  // TODO: Set initial state to empty string
  const [email, setEmail] = useState('akalanka@cube360global.com')
  const [password, setPassword] = useState('#Compaq123')

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
            .then(response => {
              // TODO: Get profile data
              navigation.navigate({
                routeName: 'Navigator'
              })
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
      .catch(error => {
        setUnauthorized(true)
        console.log(error)
      })
  }

  return (
    <View style={styles.mainViewStyle}>
      <ScrollView>
        <Animated.View style={styles.animatedViewStyle}>
          <View style={styles.container}>
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
            <View style={styles.viewStyle}>
              <Button title={'Login'}
                      disabled={isDisabled()}
                      onPress={login}>
              </Button>
            </View>
            {
              unauthorized ? (
                <View style={styles.viewStyle}>
                  <Text style={styles.errorText}>
                    {Constants.LOGIN_ERROR}
                  </Text>
                </View>
              ) : null
            }
          </View>
        </Animated.View>
      </ScrollView>
    </View>
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
  animatedViewStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    margin: 10
  },
  errorText: {
    color: Colors.errorColor
  },
  labelStyle: {
    marginLeft: 20,
    marginTop: 24,
    color: Colors.primaryColor
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
    borderRadius: 10,
    height: 40,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    marginTop: 10,
    color: Colors.tertiaryColor
  },
  viewStyle: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10
  }
})

export default LoginScreen
