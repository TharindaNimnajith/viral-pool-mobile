import React, {useContext, useState} from 'react'
import {
  ActivityIndicator,
  Image,
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
import Colors from '../../../shared/colors'
import Constants from '../../../shared/constants'
import {LoginDetails} from '../../../data/login-data/login-data'
import {Util} from '../../../util/util'
import {AppContext} from '../../../global/app-context'
import {storeObjectData, storeStringData} from '../../../helpers/local-storage-helpers'
import {isEmpty} from '../../../helpers/common-helpers'

const LoginScreen = ({navigation}) => {
  const appContext = useContext(AppContext)

  // For development

  // const [email, setEmail] = useState(LoginDetails[0].email)
  // const [password, setPassword] = useState(LoginDetails[0].password)

  const [email, setEmail] = useState(LoginDetails[1].email)
  const [password, setPassword] = useState(LoginDetails[1].password)

  const [emailValid, setEmailValid] = useState(true)
  const [passwordValid, setPasswordValid] = useState(true)

  // For production

  // const [email, setEmail] = useState('')
  // const [password, setPassword] = useState('')
  //
  // const [emailValid, setEmailValid] = useState(false)
  // const [passwordValid, setPasswordValid] = useState(false)

  const [state] = useState('string')
  const [redirectUri] = useState('string')
  const [clientId] = useState('string')
  const [clientName] = useState('string')

  const [unauthorized, setUnauthorized] = useState(false)

  const [loading, setLoading] = useState(false)

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
    setLoading(false)
    setLoading(true)
    setUnauthorized(false)
    let data = {
      email: email,
      password: password,
      state: state,
      redirectUri: redirectUri,
      clientId: clientId,
      clientName: clientName
    }
    // const headers = {
    //   'client_id': 'UFwv4s5sAHYyRS2q'
    // }
    axios.post('oauth/mobile-login', data, {
      // headers: headers
    }).then(async response => {
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
        axios.get('User').then(async response => {
          if (response.status === 200) {
            await storeObjectData(Util.USER_DATA, response.data.data)
            await appContext.SetUserData(response.data.data)
            navigation.navigate({
              routeName: 'Navigator'
            })
          } else {
            setLoading(false)
            setUnauthorized(true)
          }
        }).catch(async error => {
          setLoading(false)
          setUnauthorized(true)
          console.log(error)
        })
      } else {
        setLoading(false)
        setUnauthorized(true)
      }
    }).catch(async error => {
      setLoading(false)
      setUnauthorized(true)
      console.log(error)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <View style={styles.containerStyle}>
            <View style={styles.headerStyle}>
              <Image style={styles.imageStyle}
                     source={require('../../../assets/logo.png')}/>
              <Text style={styles.textStyle}>
                Manage Your Team, Clients, Content Creators | Create Strategies, Discuss, Execute | Statistics
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
          {
            loading && (
              <View style={styles.loadingStyle}>
                <ActivityIndicator size='large'
                                   color={Colors.primaryColor}/>
              </View>
            )
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
  errorTextStyle: {
    color: Colors.errorColor
  },
  imageStyle: {
    marginBottom: wp('6%')
  },
  headerStyle: {
    alignItems: 'center',
    marginBottom: wp('4%')
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
    width: wp('100%'),
    height: hp('103.3%'),
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
  textStyle: {
    width: wp('70%'),
    color: Colors.tertiaryColor,
    textAlign: 'center',
    lineHeight: 20
  },
  titleStyle: {
    textTransform: 'uppercase',
    color: Colors.primaryColor,
    fontWeight: 'bold',
    marginTop: wp('10%'),
    fontSize: 30
  },
  viewStyle: {
    marginTop: 40
  }
})

LoginScreen.navigationOptions = () => {
  return {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
}

export default LoginScreen
