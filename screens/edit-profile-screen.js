import React, {useCallback, useContext, useState} from 'react'
import {
  ActivityIndicator,
  Alert,
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
import RadioForm from 'react-native-simple-radio-button'
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import {AppContext} from '../util/app-context'
import {isEmpty, showAlert} from '../util/common-helpers'
import Colors from '../util/colors'
import Constants from '../util/constants'
import {genderOptions} from '../util/enum'
import CombinedButtons from '../components/combined-buttons'

const EditProfileScreen = () => {
  const appContext = useContext(AppContext)

  const [firstName, setFirstName] = useState(appContext.userData.firstName)
  const [lastName, setLastName] = useState(appContext.userData.lastName)
  const [gender, setGender] = useState(appContext.userData.gender?.toUpperCase() === 'MALE' ? 1 :
    appContext.userData.gender?.toUpperCase() === 'FEMALE' ? 0 : null)
  const [birthDate, setBirthDate] = useState(appContext.userData.birthDate)
  const [address, setAddress] = useState(appContext.userData.address)
  const [phoneNumber, setPhoneNumber] = useState(appContext.userData.phoneNumber)
  const [firstNameValid, setFirstNameValid] = useState(true)
  const [lastNameValid, setLastNameValid] = useState(true)
  const [addressValid, setAddressValid] = useState(true)
  const [phoneNumberValid, setPhoneNumberValid] = useState(true)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const showConfirmAlert = () => {
    Alert.alert(
      'EDIT PROFILE',
      Constants.CONFIRMATION,
      [{
        text: 'Yes',
        onPress: editProfile,
      }, {
        text: 'No'
      }],
      {
        cancelable: false
      }
    )
  }

  const onChangeFirstName = async firstName => {
    setFirstNameValid(!await isEmpty(firstName.trim()))
    setFirstName(firstName)
  }

  const onChangeLastName = async lastName => {
    setLastNameValid(!await isEmpty(lastName.trim()))
    setLastName(lastName)
  }

  const onChangeGender = async gender => {
    setGender(gender)
  }

  const onChangeBirthDate = async birthDate => {
    setBirthDate(birthDate)
  }

  const onChangeAddress = async address => {
    setAddressValid(!await isEmpty(address.trim()))
    setAddress(address)
  }

  const onChangePhoneNumber = async phoneNumber => {
    setPhoneNumberValid(phoneNumber.length === 10 && !isNaN(phoneNumber)
      && !await isEmpty(phoneNumber.trim()))
    setPhoneNumber(phoneNumber)
  }

  function isDisabled() {
    return !firstNameValid || !lastNameValid || !addressValid || !phoneNumberValid
  }

  const editProfile = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('id', appContext.userData.id)
    formData.append('email', appContext.userData.email)
    formData.append('userRole', Constants.USER_ROLE)
    formData.append('firstName', firstName.trim())
    formData.append('lastName', lastName.trim())
    formData.append('gender', gender === 0 ? 'female' : gender === 1 ? 'male' : appContext.userData.gender)
    formData.append('birthDate', birthDate)
    formData.append('address', address.trim())
    formData.append('phoneNumber', phoneNumber.trim())
    axios.put('User', formData).then(async response => {
      setLoading(false)
      if (response.status === 200) {
        await appContext.SetUserData(response.data.data)
        await showAlert(Constants.SUCCESS, Constants.UPDATED)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <View style={styles.containerStyle}>
            <Text style={styles.labelStyle}>
              First Name
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={firstName => onChangeFirstName(firstName)}
                       value={firstName}
                       placeholder='Enter First Name'
                       placeholderTextColor={Colors.tertiaryColor}/>
            <Text style={styles.labelStyle}>
              Last Name
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={lastName => onChangeLastName(lastName)}
                       value={lastName}
                       placeholder='Enter Last Name'
                       placeholderTextColor={Colors.tertiaryColor}/>
            <Text style={styles.labelStyle}>
              Gender
            </Text>
            <RadioForm radio_props={genderOptions}
                       initial={gender}
                       formHorizontal={true}
                       buttonColor={Colors.primaryColor}
                       buttonSize={10}
                       buttonOuterSize={20}
                       borderWidth={0.5}
                       labelStyle={styles.radioLabelStyle}
                       style={styles.radioStyle}
                       onPress={gender => onChangeGender(gender)}/>
            <Text style={styles.labelStyle}>
              Birthday
            </Text>
            <DatePicker style={styles.datePickerStyle}
                        date={birthDate}
                        mode='date'
                        placeholder='Enter Birthday'
                        format='YYYY-MM-DD'
                        maxDate={new Date()}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        customStyles={{
                          dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                          },
                          dateInput: {
                            marginLeft: 36,
                            borderColor: Colors.primaryColor,
                            borderRadius: 5
                          },
                          dateText: {
                            color: Colors.tertiaryColor
                          },
                          placeholderText: {
                            color: Colors.tertiaryColor
                          }
                        }}
                        onDateChange={birthDate => onChangeBirthDate(birthDate)}/>
            <Text style={styles.labelStyle}>
              Address
            </Text>
            <TextInput style={styles.multilineTextInputStyle}
                       onChangeText={address => onChangeAddress(address)}
                       value={address}
                       placeholder='Enter Address'
                       placeholderTextColor={Colors.tertiaryColor}
                       multiline={true}
                       numberOfLines={9}/>
            <Text style={styles.labelStyle}>
              Phone Number
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={phoneNumber => onChangePhoneNumber(phoneNumber)}
                       value={phoneNumber}
                       placeholder='Enter Phone Number'
                       placeholderTextColor={Colors.tertiaryColor}/>
            <TouchableOpacity style={isDisabled() ? styles.buttonDisabledStyle : styles.buttonStyle}
                              disabled={isDisabled()}
                              onPress={showConfirmAlert}>
              <Text style={styles.buttonTextStyle}>
                Update
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
    marginTop: hp('2%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
  },
  datePickerStyle: {
    borderColor: Colors.secondaryColor,
    width: wp('80%'),
    marginTop: 10,
    color: Colors.tertiaryColor
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
    height: hp('93.6%'),
    backgroundColor: Colors.secondaryColor
  },
  multilineTextInputStyle: {
    textAlignVertical: 'top',
    borderColor: Colors.primaryColor,
    width: wp('80%'),
    height: hp('20%'),
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    color: Colors.tertiaryColor
  },
  radioLabelStyle: {
    color: Colors.primaryColor,
    marginRight: wp('20%')
  },
  radioStyle: {
    marginTop: 10,
    width: wp('80%')
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
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

EditProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Edit Profile',
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default EditProfileScreen
