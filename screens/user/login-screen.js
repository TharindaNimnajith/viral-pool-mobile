import React, {useState} from 'react'
import {Animated, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import axios from 'axios'
import Colors from '../../shared/colors'
import {Util} from '../../util/util'
import {storeStringData} from '../../helpers/local-storage'

const LoginScreen = ({navigation}) => {
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const login = () => {
    axios.post('oauth/token',
      {
        email: 'akalanka@cube360global.com',
        password: '#Compaq123',
        state: 'string',
        redirectUri: 'string',
        clientId: 'string',
        clientName: 'string'
      }).then(response => {
        console.log(response)
        // noinspection JSUnresolvedVariable
        storeStringData(Util.ACCESS_TOKEN, response.data.access_token).then(() => {
        })
        // noinspection JSUnresolvedVariable
        storeStringData(Util.REFRESH_TOKEN, response.data.refresh_token).then(() => {
        })
        // navigation.navigate({
        //   routeName: 'Navigator'
        // })
      }).catch(error => {
      console.error(error)
      // localStorage.removeItem(Util.ACCESS_TOKEN)
      // localStorage.removeItem(Util.REFRESH_TOKEN)
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
                       onChangeText={email => setEmail(email)}
                       value={email}
                       placeholder='Enter Email'
                       placeholderTextColor={Colors.tertiaryColor}
                       secureTextEntry={false}/>
            <Text style={styles.labelStyle}>
              Password
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={password => setPassword(password)}
                       value={password}
                       placeholder='Enter Password'
                       placeholderTextColor={Colors.tertiaryColor}
                       secureTextEntry={true}/>
            <View style={styles.viewStyle}>
              <TouchableOpacity style={styles.touchableOpacityStyle}
                                onPress={() => {
                                  login()
                                }}>
                <Text style={styles.buttonStyle}>
                  Login
                </Text>
              </TouchableOpacity>
            </View>
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
  buttonStyle: {
    color: Colors.secondaryColor,
    fontSize: 18,
    textTransform: 'uppercase'
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'center',
    margin: 10
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
  touchableOpacityStyle: {
    width: '100%',
    height: 40,
    backgroundColor: Colors.primaryColor,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  viewStyle: {
    marginTop: 50,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10
  }
})

export default LoginScreen
