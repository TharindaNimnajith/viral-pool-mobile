import React, {useContext, useState} from 'react'
// noinspection ES6UnusedImports
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
import Dialog from 'react-native-dialog'
import axios from 'axios'
import validator from 'validator'
import {AppContext} from '../../../global/app-context'
import {isEmpty} from '../../../helpers/common-helpers'
import Colors from '../../../shared/colors'
import Constants from '../../../shared/constants'
import Logout from '../../../components/buttons/logout-button'

const EditProfileScreen = () => {
  const appContext = useContext(AppContext)

  // noinspection JSUnresolvedVariable
  const [firstName, setFirstName] = useState(appContext.userData.firstName)

  // noinspection JSUnresolvedVariable
  const [lastName, setLastName] = useState(appContext.userData.lastName)

  // noinspection JSUnresolvedVariable
  const [gender, setGender] = useState(appContext.userData.gender)

  // noinspection JSUnresolvedVariable
  const [birthDate, setBirthDate] = useState(appContext.userData.birthDate)

  const [address, setAddress] = useState(appContext.userData.address)

  // noinspection JSUnresolvedVariable
  const [phoneNumber, setPhoneNumber] = useState(appContext.userData.phoneNumber)

  const [firstNameValid, setFirstNameValid] = useState(true)
  const [lastNameValid, setLastNameValid] = useState(true)
  // const [genderValid, setGenderValid] = useState(true)
  const [birthDateValid, setBirthDateValid] = useState(true)
  const [addressValid, setAddressValid] = useState(true)
  const [phoneNumberValid, setPhoneNumberValid] = useState(true)

  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState(false)

  // const [userData, setUserData] = useState(null)
  //
  // useEffect(() => {
  //   getObjectData(Util.USER_DATA).then(value => {
  //     setUserData(value)
  //   })
  // }, [])

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const showAlert = () => {
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
    setBirthDateValid(checkBirthDateValidity(birthDate))
    setError(false)
    setBirthDate(birthDate)
  }

  const onChangeAddress = async address => {
    setAddressValid(!await isEmpty(address.trim()))
    setError(false)
    setAddress(address)
  }

  const onChangePhoneNumber = async phoneNumber => {
    setPhoneNumberValid(checkPhoneNumberValidity(phoneNumber))
    setError(false)
    setPhoneNumber(phoneNumber)
  }

  const checkPhoneNumberValidity = async phoneNumber => {
    if (!await isEmpty(phoneNumber.trim()))
      // noinspection JSUnresolvedFunction
      if (validator.isNumeric(phoneNumber))
        // noinspection JSUnresolvedFunction
        if (validator.isLength(phoneNumber, {
          min: 10,
          max: 10
        }))
          return true
    return false
  }

  const checkBirthDateValidity = async birthDate => {
    // noinspection JSUnresolvedFunction
    if (validator.isDate(birthDate))
      // noinspection JSUnresolvedFunction
      if (validator.isBefore(birthDate, Date.now()))
        return true
    return false
  }

  function isDisabled() {
    return !firstNameValid || !lastNameValid || !birthDateValid || !addressValid || !phoneNumberValid
  }

  const editIdea = async () => {
    setVisible(false)
    setLoading(true)
    setError(false)
    axios.put('', {
      title: title,
      description: description,
      userId: idea.idea.userId
    }).then(async response => {
      if (response.status === 200) {
        // navigation.navigate({
        //   routeName: 'IdeaList'
        // })
        setTitle('')
        setDescription('')
        setLoading(false)
        await showAlert()
      } else {
        setLoading(false)
        setError(true)
      }
    }).catch(error => {
      setLoading(false)
      setError(true)
      console.log(error)
    })
  }

  return (
    <SafeAreaView>
      {/*<ScrollView>*/}
      <Dialog.Container visible={visible}>
        <Dialog.Title>
          EDIT IDEA
        </Dialog.Title>
        <Dialog.Description>
          Do you want to update the idea?
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={editIdea}/>
        <Dialog.Button label='No'
                       onPress={hideDialog}/>
      </Dialog.Container>
      <View style={styles.mainViewStyle}>
        <View style={styles.containerStyle}>
          <Text style={styles.labelStyle}>
            Title
          </Text>
          <TextInput style={styles.textInputStyle}
                     onChangeText={title => onChangeTitle(title)}
                     value={title}
                     placeholder='Enter Title'
                     placeholderTextColor={Colors.tertiaryColor}/>
          <Text style={styles.labelStyle}>
            Description
          </Text>
          <TextInput style={styles.multilineTextInputStyle}
                     onChangeText={description => onChangeDescription(description)}
                     value={description}
                     placeholder='Enter Description'
                     placeholderTextColor={Colors.tertiaryColor}
                     multiline={true}
                     numberOfLines={15}/>
          <TouchableOpacity style={isDisabled() ? styles.buttonDisabledStyle : styles.buttonStyle}
                            disabled={isDisabled()}
                            onPress={showDialog}>
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
      {/*</ScrollView>*/}
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
    backgroundColor: Colors.disabledColor,
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
    marginTop: wp('5%'),
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1
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
    height: wp('60%'),
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 10,
    padding: 10,
    color: Colors.tertiaryColor
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
    headerTitle: 'EDIT PROFILE',
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default EditProfileScreen
