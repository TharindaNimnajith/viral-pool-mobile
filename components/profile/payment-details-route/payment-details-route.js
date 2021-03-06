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
import axios from 'axios'
import {AppContext} from '../../../shared/global/app-context'
import {isNullAsync, showAlert, showErrors} from '../../../shared/util/helpers'
import Colors from '../../../shared/const/colors'
import Constants from '../../../shared/const/constants'
import {styles} from './payment-details-route-styles'

const PaymentDetailsRoute = () => {
  const appContext = useContext(AppContext)

  const [bankAccountName, setBankAccountName] = useState(appContext.userData.bankAccountName)
  const [bankAccountNumber, setBankAccountNumber] = useState(appContext.userData.bankAccountNumber)
  const [bankName, setBankName] = useState(appContext.userData.bankName)
  const [branchName, setBranchName] = useState(appContext.userData.branchName)
  const [loading, setLoading] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => {
      setRefreshing(false)
    })
  }, [])

  const onChangeBankAccountName = async bankAccountName => {
    setBankAccountName(bankAccountName)
  }

  const onChangeBankAccountNumber = async bankAccountNumber => {
    setBankAccountNumber(bankAccountNumber)
  }

  const onChangeBankName = async bankName => {
    setBankName(bankName)
  }

  const onChangeBranchName = async branchName => {
    setBranchName(branchName)
  }

  function isDisabled() {
    return false
  }

  const editPaymentDetails = async () => {
    setLoading(true)
    const formData = new FormData()
    formData.append('id', appContext.userData?.id)
    formData.append('email', appContext.userData?.email)
    formData.append('userRole', Constants.USER_ROLE)
    formData.append('gender', appContext.userData?.gender === 0 ? 'female' :
      appContext.userData?.gender === 1 ? 'male' : appContext.userData?.gender)
    formData.append('birthDate', appContext.userData?.birthDate)
    if (await isNullAsync(appContext.userData?.firstName))
      formData.append('firstName', '')
    else
      formData.append('firstName', appContext.userData?.firstName.trim())
    if (await isNullAsync(appContext.userData?.lastName))
      formData.append('lastName', '')
    else
      formData.append('lastName', appContext.userData?.lastName.trim())
    if (await isNullAsync(appContext.userData?.address))
      formData.append('address', '')
    else
      formData.append('address', appContext.userData?.address.trim())
    if (await isNullAsync(appContext.userData?.phoneNumber))
      formData.append('phoneNumber', '')
    else
      formData.append('phoneNumber', appContext.userData?.phoneNumber.trim())
    if (await isNullAsync(bankAccountName))
      formData.append('bankAccountName', '')
    else
      formData.append('bankAccountName', bankAccountName.trim())
    if (await isNullAsync(bankAccountNumber))
      formData.append('bankAccountNumber', '')
    else
      formData.append('bankAccountNumber', bankAccountNumber.trim())
    if (await isNullAsync(bankName))
      formData.append('bankName', '')
    else
      formData.append('bankName', bankName.trim())
    if (await isNullAsync(branchName))
      formData.append('branchName', '')
    else
      formData.append('branchName', branchName.trim())
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
              Bank Account Name
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={bankAccountName => onChangeBankAccountName(bankAccountName)}
                       value={bankAccountName}
                       placeholder='Enter Bank Account Name'
                       placeholderTextColor={Colors.tertiaryColor}/>
            <Text style={styles.labelStyle}>
              Bank Account Number
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={bankAccountNumber => onChangeBankAccountNumber(bankAccountNumber)}
                       value={bankAccountNumber}
                       placeholder='Enter Bank Account Number'
                       placeholderTextColor={Colors.tertiaryColor}/>
            <Text style={styles.labelStyle}>
              Bank Name
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={bankName => onChangeBankName(bankName)}
                       value={bankName}
                       placeholder='Enter Bank Name'
                       placeholderTextColor={Colors.tertiaryColor}/>
            <Text style={styles.labelStyle}>
              Branch Name
            </Text>
            <TextInput style={styles.textInputStyle}
                       onChangeText={branchName => onChangeBranchName(branchName)}
                       value={branchName}
                       placeholder='Enter Branch Name'
                       placeholderTextColor={Colors.tertiaryColor}/>
          </View>
          <View style={styles.containerStyle}>
            <TouchableOpacity style={isDisabled() ? styles.buttonDisabledStyle : styles.buttonStyle}
                              disabled={isDisabled()}
                              onPress={editPaymentDetails}>
              <Text style={styles.buttonTextStyle}>
                Update Payment Details
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

export default PaymentDetailsRoute
