import React, {useContext, useState} from 'react'
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
// import Dialog from 'react-native-dialog'
import RadioForm from 'react-native-simple-radio-button'
// "react-native-dropdown-picker": "^4.0.9"
// import DropDownPicker from 'react-native-dropdown-picker'
// "react-native-picker-select": "^8.0.4"
// "@react-native-picker/picker": "^1.15.0"
// import RNPickerSelect from 'react-native-picker-select'
import DatePicker from 'react-native-datepicker'
// "@react-native-community/datetimepicker": "^3.0.4",
// import DateTimePicker from '@react-native-community/datetimepicker'
// "react-native-date-picker": "^3.2.10"
// import DatePicker from 'react-native-date-picker'
import axios from 'axios'
import {AppContext} from '../../../global/app-context'
import {isEmpty} from '../../../helpers/common-helpers'
import {storeObjectData} from '../../../helpers/local-storage-helpers'
import {Util} from '../../../util/util'
import Colors from '../../../shared/colors'
import Constants from '../../../shared/constants'
import CombinedButtons from '../../../components/buttons/combined-buttons'

const genderOptions = [{
  label: 'Female',
  value: 0
}, {
  label: 'Male',
  value: 1
}]

// noinspection JSUnusedLocalSymbols
const EditProfileScreen = props => {
  // noinspection JSCheckFunctionSignatures
  const appContext = useContext(AppContext)

  // noinspection JSUnresolvedVariable
  const [firstName, setFirstName] = useState(appContext.userData.firstName)
  // noinspection JSUnresolvedVariable
  const [lastName, setLastName] = useState(appContext.userData.lastName)
  // noinspection JSUnresolvedVariable
  const [gender, setGender] = useState(appContext.userData.gender.toUpperCase() === 'MALE' ? 1
    : appContext.userData.gender.toUpperCase() === 'FEMALE' ? 0 : null)
  // noinspection JSUnresolvedVariable
  const [birthDate, setBirthDate] = useState(appContext.userData.birthDate)
  const [address, setAddress] = useState(appContext.userData.address)
  // noinspection JSUnresolvedVariable
  const [phoneNumber, setPhoneNumber] = useState(appContext.userData.phoneNumber)

  const [firstNameValid, setFirstNameValid] = useState(true)
  const [lastNameValid, setLastNameValid] = useState(true)
  const [addressValid, setAddressValid] = useState(true)
  const [phoneNumberValid, setPhoneNumberValid] = useState(true)
  // const [birthDateValid, setBirthDateValid] = useState(true)
  // const [genderValid, setGenderValid] = useState(true)

  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(false)

  // const [visible, setVisible] = useState(true)

  // const [userData, setUserData] = useState(null)
  //
  // useEffect(() => {
  //   getObjectData(Util.USER_DATA).then(userData => {
  //     setUserData(userData)
  //   })
  // }, [])

  // const showDialog = async () => {
  //   setVisible(true)
  // }
  //
  // const hideDialog = async () => {
  //   setVisible(false)
  // }

  const showConfirmAlert = () => {
    Alert.alert(
      'EDIT PROFILE',
      'Do you want to update the profile details?',
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

  const showSuccessAlert = () => {
    Alert.alert(
      'SUCCESS',
      'Profile updated successfully!',
      [{
        text: 'OK'
      }]
    )
  }

  const onChangeFirstName = async firstName => {
    setFirstNameValid(!await isEmpty(firstName.trim()))
    setError(false)
    setFirstName(firstName)
  }

  const onChangeLastName = async lastName => {
    setLastNameValid(!await isEmpty(lastName.trim()))
    setError(false)
    setLastName(lastName)
  }

  const onChangeGender = async gender => {
    // setGenderValid(!await isEmpty(gender.trim()))
    setError(false)
    setGender(gender)
  }

  const onChangeBirthDate = async birthDate => {
    // setBirthDateValid(await checkBirthDateValidity(birthDate))
    setError(false)
    setBirthDate(birthDate)
  }

  const onChangeAddress = async address => {
    setAddressValid(!await isEmpty(address.trim()))
    setError(false)
    setAddress(address)
  }

  const onChangePhoneNumber = async phoneNumber => {
    setPhoneNumberValid(phoneNumber.length === 10 && !isNaN(phoneNumber)
      && !await isEmpty(phoneNumber.trim()))
    setError(false)
    setPhoneNumber(phoneNumber)
  }

  // const checkPhoneNumberValidity = async phoneNumber => {
  //   if (!await isEmpty(phoneNumber.trim()))
  //     // noinspection JSUnresolvedFunction
  //     if (validator.isNumeric(phoneNumber))
  //       // noinspection JSUnresolvedFunction
  //       if (validator.isLength(phoneNumber, {
  //         min: 10,
  //         max: 10
  //       }))
  //         return true
  //   return false
  // }
  //
  // const checkBirthDateValidity = async birthDate => {
  //   // noinspection JSUnresolvedFunction
  //   if (validator.isDate(birthDate))
  //     // noinspection JSUnresolvedFunction
  //     if (validator.isBefore(birthDate, Date.now()))
  //       return true
  //   return false
  // }

  function isDisabled() {
    return !firstNameValid || !lastNameValid || !addressValid || !phoneNumberValid
  }

  const editProfile = async () => {
    // setVisible(false)
    setLoading(false)
    setLoading(true)
    setError(false)
    const formData = new FormData()
    formData.append('id', appContext.userData.id)
    formData.append('email', appContext.userData.email)
    // noinspection JSUnresolvedVariable
    formData.append('userRole', appContext.userData.userRole)
    // noinspection JSUnresolvedVariable
    // formData.append('profileImagePath', appContext.userData.profileImagePath)
    formData.append('firstName', firstName)
    formData.append('lastName', lastName)
    // noinspection JSUnresolvedVariable
    formData.append('gender', gender === 0 ? 'female' : gender === 1 ? 'male' : appContext.userData.gender)
    formData.append('birthDate', birthDate)
    formData.append('address', address)
    formData.append('phoneNumber', phoneNumber)
    // let data = {
    //   id: appContext.userData.id,
    //   email: appContext.userData.email,
    //   userRole: appContext.userData.userRole,
    //   profileImagePath: appContext.userData.profileImagePath,
    //   firstName: firstName,
    //   lastName: lastName,
    //   gender: gender === 0 ? 'female' : gender === 1 ? 'male' : appContext.userData.gender,
    //   birthDate: birthDate,
    //   address: address,
    //   phoneNumber: phoneNumber
    // }
    axios.put('User', formData).then(async response => {
      if (response.status === 200) {
        // navigation.navigate({
        //   routeName: 'Profile'
        // })
        await appContext.SetUserData(response.data.data)
        await storeObjectData(Util.USER_DATA, response.data.data)
        setLoading(false)
        await showSuccessAlert()
      } else {
        setLoading(false)
        setError(true)
      }
    }).catch(async error => {
      setLoading(false)
      setError(true)
      console.log(error)
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        {/*<Dialog.Container visible={visible}>*/}
        {/*  <Dialog.Title>*/}
        {/*    EDIT PROFILE*/}
        {/*  </Dialog.Title>*/}
        {/*  <Dialog.Description>*/}
        {/*    Do you want to update the profile details?*/}
        {/*  </Dialog.Description>*/}
        {/*  <Dialog.Button label='Yes'*/}
        {/*                 onPress={editProfile}/>*/}
        {/*  <Dialog.Button label='No'*/}
        {/*                 onPress={hideDialog}/>*/}
        {/*</Dialog.Container>*/}
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
            {/*<DropDownPicker items={genderOptions}*/}
            {/*                defaultValue={gender}*/}
            {/*                containerStyle={styles.dropdownContainerStyle}*/}
            {/*                style={styles.dropdownPickerStyle}*/}
            {/*                itemStyle={styles.dropdownItemStyle}*/}
            {/*                dropDownStyle={styles.dropdownStyle}*/}
            {/*                labelStyle={styles.dropdownLabelStyle}*/}
            {/*                onChangeItem={gender => onChangeGender(gender)}/>*/}
            {/*<RNPickerSelect onValueChange={gender => onChangeGender(gender)}*/}
            {/*                items={genderOptions}/>*/}
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
            {/*<DateTimePicker testID='dateTimePicker'*/}
            {/*                value={birthDate}*/}
            {/*                mode={'date'}*/}
            {/*                is24Hour={true}*/}
            {/*                display='default'*/}
            {/*                onChange={birthDate => onChangeBirthDate(birthDate)}/>*/}
            {/*<DatePicker style={styles.datePickerStyle}*/}
            {/*            date={birthDate}*/}
            {/*            onDateChange={birthDate => onChangeBirthDate(birthDate)}/>*/}
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
            {
              error ? (
                <View style={styles.viewStyle}>
                  <Text style={styles.errorTextStyle}>
                    {Constants.ERROR}
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
  // dropdownContainerStyle: {
  //   width: wp('80%'),
  //   height: 40,
  //   marginTop: 10,
  //   borderColor: Colors.secondaryColor,
  //   borderWidth: 1,
  //   borderRadius: 5
  // },
  // dropdownItemStyle: {
  //   justifyContent: 'flex-start'
  // },
  // dropdownLabelStyle: {
  //   color: Colors.tertiaryColor
  // },
  // dropdownPickerStyle: {
  //   borderColor: Colors.primaryColor
  // },
  // dropdownStyle: {
  //   borderColor: Colors.primaryColor
  // },
  errorTextStyle: {
    color: Colors.errorColor
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
    height: hp('100%'),
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
  },
  viewStyle: {
    marginTop: 40
  }
})

EditProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Edit Profile',
    headerRight: () => <CombinedButtons navigation={navData.navigation}/>
  }
}

export default EditProfileScreen
