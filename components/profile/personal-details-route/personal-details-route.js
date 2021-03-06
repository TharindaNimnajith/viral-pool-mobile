import React, {useCallback, useContext, useState} from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import RadioForm from 'react-native-simple-radio-button'
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import {AppContext} from '../../../shared/global/app-context'
import {genderOptions, isNull, isNullAsync, showAlert, showErrors} from '../../../shared/util/helpers'
import Colors from '../../../shared/const/colors'
import Constants from '../../../shared/const/constants'
import {styles} from './personal-details-route-styles'

const PersonalDetailsRoute = () => {
  const appContext = useContext(AppContext)

  const [firstName, setFirstName] = useState(appContext.userData.firstName)
  const [lastName, setLastName] = useState(appContext.userData.lastName)
  const [gender, setGender] = useState(appContext.userData.gender?.toLowerCase() === 'male' ? 1 :
    appContext.userData.gender?.toLowerCase() === 'female' ? 0 : null)
  const [birthDate, setBirthDate] = useState(appContext.userData.birthDate)
  const [address, setAddress] = useState(appContext.userData.address)
  const [phoneNumber, setPhoneNumber] = useState(appContext.userData.phoneNumber)
  const [phoneNumberValid, setPhoneNumberValid] = useState(true)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  const onChangeFirstName = async firstName => {
    setFirstName(firstName)
  }

  const onChangeLastName = async lastName => {
    setLastName(lastName)
  }

  const onChangeGender = async gender => {
    setGender(gender)
  }

  const onChangeBirthDate = async birthDate => {
    setBirthDate(birthDate)
  }

  const onChangeAddress = async address => {
    setAddress(address)
  }

  const onChangePhoneNumber = async phoneNumber => {
    if (!await isNullAsync(phoneNumber))
      setPhoneNumberValid(phoneNumber.trim().length === 10 && !isNaN(phoneNumber))
    setPhoneNumber(phoneNumber)
  }

  function isDisabled() {
    if (!isNull(phoneNumber))
      if (phoneNumber.trim().length === 0)
        return false
    return !phoneNumberValid
  }

  const editPersonalDetails = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('id', appContext.userData?.id)
    formData.append('email', appContext.userData?.email)
    formData.append('userRole', Constants.USER_ROLE)
    formData.append('gender', gender === 0 ? 'female' : gender === 1 ? 'male' : appContext.userData?.gender)
    formData.append('birthDate', birthDate)
    if (await isNullAsync(firstName))
      formData.append('firstName', '')
    else
      formData.append('firstName', firstName.trim())
    if (await isNullAsync(lastName))
      formData.append('lastName', '')
    else
      formData.append('lastName', lastName.trim())
    if (await isNullAsync(address))
      formData.append('address', '')
    else
      formData.append('address', address.trim())
    if (await isNullAsync(phoneNumber))
      formData.append('phoneNumber', '')
    else
      formData.append('phoneNumber', phoneNumber.trim())
    if (await isNullAsync(appContext.userData?.bankAccountName))
      formData.append('bankAccountName', '')
    else
      formData.append('bankAccountName', appContext.userData?.bankAccountName.trim())
    if (await isNullAsync(appContext.userData?.bankAccountNumber))
      formData.append('bankAccountNumber', '')
    else
      formData.append('bankAccountNumber', appContext.userData?.bankAccountNumber.trim())
    if (await isNullAsync(appContext.userData?.bankName))
      formData.append('bankName', '')
    else
      formData.append('bankName', appContext.userData?.bankName.trim())
    if (await isNullAsync(appContext.userData?.branchName))
      formData.append('branchName', '')
    else
      formData.append('branchName', appContext.userData?.branchName.trim())
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
      await showErrors(error.response.data)
      console.log(error.response.data)
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
                        onDateChange={birthDate => onChangeBirthDate(birthDate)}
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
                            borderColor: Colors.defaultColor,
                            borderRadius: 5
                          },
                          dateText: {
                            color: Colors.tertiaryColor
                          },
                          placeholderText: {
                            color: Colors.tertiaryColor
                          }
                        }}/>
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
          </View>
          <View style={styles.containerStyle}>
            <TouchableOpacity style={isDisabled() ? styles.buttonDisabledStyle : styles.buttonStyle}
                              disabled={isDisabled()}
                              onPress={editPersonalDetails}>
              <Text style={styles.buttonTextStyle}>
                Update Personal Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      {
        loading &&
        <View style={styles.loadingStyle}>
          <ActivityIndicator size='large'
                             color={Colors.secondaryColor}/>
        </View>
      }
    </SafeAreaView>
  )
}

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default PersonalDetailsRoute
