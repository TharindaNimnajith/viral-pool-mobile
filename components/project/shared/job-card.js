import React, {useState} from 'react'
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Dialog from 'react-native-dialog'
import {Entypo, Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import {contentSubmissionStatusEnum, resultSubmissionStatusEnum} from '../../../shared/const/enums'
import Colors from '../../../shared/const/colors'
import Constants from '../../../shared/const/constants'
import {showAlert, showErrors} from '../../../shared/util/helpers'

const JobCard = props => {
  const [contentSubmissionLink, setContentSubmissionLink] = useState(props.itemData.contentSubmissionLink)
  const [resultSubmissionLink, setResultSubmissionLink] = useState(props.itemData.resultSubmissionLink)
  const [contentSubmissionLinkValid, setContentSubmissionLinkValid] =
    useState(props.itemData.contentSubmissionStatus !== contentSubmissionStatusEnum.Default)
  const [resultSubmissionLinkValid, setResultSubmissionLinkValid] =
    useState(props.itemData.resultSubmissionStatus !== resultSubmissionStatusEnum.Default)
  const [visibleContentSubmit, setVisibleContentSubmit] = useState(false)
  const [visibleContentDelete, setVisibleContentDelete] = useState(false)
  const [visibleResultSubmit, setVisibleResultSubmit] = useState(false)
  const [visibleResultDelete, setVisibleResultDelete] = useState(false)

  const showDialogContentSubmit = async () => {
    setVisibleContentSubmit(true)
  }

  const hideDialogContentSubmit = async () => {
    setVisibleContentSubmit(false)
  }

  const showDialogContentDelete = async () => {
    setVisibleContentDelete(true)
  }

  const hideDialogContentDelete = async () => {
    setVisibleContentDelete(false)
  }

  const showDialogResultSubmit = async () => {
    setVisibleResultSubmit(true)
  }

  const hideDialogResultSubmit = async () => {
    setVisibleResultSubmit(false)
  }

  const showDialogResultDelete = async () => {
    setVisibleResultDelete(true)
  }

  const hideDialogResultDelete = async () => {
    setVisibleResultDelete(false)
  }

  const onChangeContentSubmissionLink = async contentSubmissionLink => {
    setContentSubmissionLinkValid(contentSubmissionLink.trim().length > 0)
    setContentSubmissionLink(contentSubmissionLink)
  }

  const onChangeResultSubmissionLink = async resultSubmissionLink => {
    setResultSubmissionLinkValid(resultSubmissionLink.trim().length > 0)
    setResultSubmissionLink(resultSubmissionLink)
  }

  const contentSubmit = async () => {
    setVisibleContentSubmit(false)
    props.setLoadingTrue()
    let data = {
      strategyId: props.strategyId,
      id: props.itemData.id,
      contentLink: contentSubmissionLink
    }
    axios.put('project-cc-strategy/content-link', data).then(async response => {
      props.refresh()
      props.setLoadingFalse()
      props.refreshFunction()
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      props.refresh()
      props.setLoadingFalse()
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const contentDelete = async () => {
    setVisibleContentDelete(false)
    props.setLoadingTrue()
    let data = {
      strategyId: props.strategyId,
      id: props.itemData.id,
      contentLink: null
    }
    axios.put('project-cc-strategy/content-link', data).then(async response => {
      props.refresh()
      props.setLoadingFalse()
      props.refreshFunction()
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      props.refresh()
      props.setLoadingFalse()
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const resultSubmit = async () => {
    setVisibleResultSubmit(false)
    props.setLoadingTrue()
    let data = {
      strategyId: props.strategyId,
      id: props.itemData.id,
      resultLink: resultSubmissionLink
    }
    axios.put('project-cc-strategy/result-link', data).then(async response => {
      props.refresh()
      props.setLoadingFalse()
      props.refreshFunction()
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      props.refresh()
      props.setLoadingFalse()
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const resultDelete = async () => {
    setVisibleResultDelete(false)
    props.setLoadingTrue()
    let data = {
      strategyId: props.strategyId,
      id: props.itemData.id,
      resultLink: null
    }
    axios.put('project-cc-strategy/result-link', data).then(async response => {
      props.refresh()
      props.setLoadingFalse()
      props.refreshFunction()
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      props.refresh()
      props.setLoadingFalse()
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  return (
    <View>
      <Dialog.Container visible={visibleContentSubmit}
                        onBackdropPress={hideDialogContentSubmit}>
        <Dialog.Title>
          SUBMIT CONTENT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={contentSubmit}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialogContentSubmit}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleContentDelete}
                        onBackdropPress={hideDialogContentDelete}>
        <Dialog.Title>
          DELETE CONTENT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={contentDelete}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialogContentDelete}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleResultSubmit}
                        onBackdropPress={hideDialogResultSubmit}>
        <Dialog.Title>
          SUBMIT RESULT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={resultSubmit}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialogResultSubmit}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleResultDelete}
                        onBackdropPress={hideDialogResultDelete}>
        <Dialog.Title>
          DELETE RESULT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={resultDelete}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialogResultDelete}/>
      </Dialog.Container>
      <View style={styles.submissionViewStyle}>

        <View style={{alignItems:'flex-end',paddingRight:15, width:'100%'}}>
          {
            props.itemData.isPaid ? (
                <Text style={styles.statusPaidStyle}>
                  Paid
                </Text>
            ) : (
                <Text style={styles.statusNotPaidStyle}>
                  Not Paid
                </Text>
            )
          }
        </View>
        <View style={styles.headerStyle}>




          <View style={styles.horizontalStyle}>
            <View style={styles.iconViewStyle}>
              <Image style={styles.avatarStyle}
                     source={{
                       uri: props.itemData.socialMediaAccountResponse.profileImage
                     }}/>
            </View>
            <Text style={styles.nameStyle}>
              {props.itemData.socialMediaAccountResponse.profileName}
            </Text>
          </View>



        </View>
        {
          !props.isContentGivenByStrategyMember &&
          <View style={styles.centerViewStyle}>
            <Text style={styles.labelStyle}>
              Content Submission Link
            </Text>
            <TextInput style={styles.textInputStyle}
                       value={contentSubmissionLink}
                       onChangeText={contentSubmissionLink => onChangeContentSubmissionLink(contentSubmissionLink)}
                       placeholder='Paste Link Here'
                       placeholderTextColor={Colors.tertiaryColor}
                       editable={props.itemData.contentSubmissionStatus !== contentSubmissionStatusEnum.Approved}/>
            {
              props.itemData.contentSubmissionStatus !== contentSubmissionStatusEnum.Approved &&
              <View style={styles.horizontalStyle}>
                <TouchableOpacity disabled={!contentSubmissionLinkValid}
                                  onPress={showDialogContentDelete}
                                  style={contentSubmissionLinkValid ? styles.deleteButtonStyle :
                                    styles.buttonDisabledStyle}>
                  <View style={styles.horizontalStyle}>
                    <Entypo name='cross'
                            size={19}
                            color={Colors.secondaryColor}/>
                    <Text style={styles.buttonTextStyle}>
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity disabled={!contentSubmissionLinkValid}
                                  onPress={showDialogContentSubmit}
                                  style={contentSubmissionLinkValid ? styles.submitButtonStyle :
                                    styles.buttonDisabledStyle}>
                  <View style={styles.horizontalStyle}>
                    <Ionicons name='checkmark'
                              size={19}
                              color={Colors.secondaryColor}/>
                    <Text style={styles.buttonTextStyle}>
                      Submit
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
          </View>
        }
        {
          (props.isContentGivenByStrategyMember ||
            props.itemData.contentSubmissionStatus === contentSubmissionStatusEnum.Approved) &&
          <View style={styles.centerViewStyle}>
            <Text style={styles.labelStyle}>
              Result Submission Link
            </Text>
            <TextInput style={styles.textInputStyle}
                       value={resultSubmissionLink}
                       onChangeText={resultSubmissionLink => onChangeResultSubmissionLink(resultSubmissionLink)}
                       placeholder='Paste Link Here'
                       placeholderTextColor={Colors.tertiaryColor}
                       editable={props.itemData.resultSubmissionStatus !== resultSubmissionStatusEnum.Approved}/>
            {
              props.itemData.resultSubmissionStatus !== resultSubmissionStatusEnum.Approved &&
              <View style={styles.horizontalStyle}>
                <TouchableOpacity disabled={!resultSubmissionLinkValid}
                                  onPress={showDialogResultDelete}
                                  style={resultSubmissionLinkValid ? styles.deleteButtonStyle :
                                    styles.buttonDisabledStyle}>
                  <View style={styles.horizontalStyle}>
                    <Entypo name='cross'
                            size={19}
                            color={Colors.secondaryColor}/>
                    <Text style={styles.buttonTextStyle}>
                      Delete
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity disabled={!resultSubmissionLinkValid}
                                  onPress={showDialogResultSubmit}
                                  style={resultSubmissionLinkValid ? styles.submitButtonStyle :
                                    styles.buttonDisabledStyle}>
                  <View style={styles.horizontalStyle}>
                    <Ionicons name='checkmark'
                              size={19}
                              color={Colors.secondaryColor}/>
                    <Text style={styles.buttonTextStyle}>
                      Submit
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            }
          </View>
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  avatarStyle: {
    width: 56,
    height: 56,
    borderRadius: 28
  },
  buttonDisabledStyle: {
    marginTop: hp('3%'),
    marginHorizontal: 7,
    backgroundColor: Colors.tertiaryColor,
    alignItems: 'center',
    padding: 8,
    width: wp('38%'),
    borderRadius: 5
  },
  buttonTextStyle: {
    color: Colors.secondaryColor,
    textTransform: 'uppercase',
    marginLeft: 5,
    fontSize: 16
  },
  centerViewStyle: {
    alignItems: 'center',
    marginBottom: 30
  },
  deleteButtonStyle: {
    marginTop: hp('3%'),
    marginHorizontal: 7,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 8,
    width: wp('38%'),
    borderRadius: 5
  },
  headerStyle: {
    marginTop: 5,
    marginBottom: 27,
    marginLeft: 5
  },
  horizontalStyle: {
    flexDirection: 'row'
  },
  iconViewStyle: {
    width: '20%',
    alignSelf: 'center',
    alignItems: 'center'
  },
  labelStyle: {
    marginTop: 5,
    color: Colors.primaryColor,
    alignSelf: 'baseline',
    marginLeft: wp('4%')
  },
  nameStyle: {
    width: '100%',
    flexShrink: 1,
    alignSelf: 'center',
    marginLeft: 5,
    fontSize: 20
  },
  statusNotPaidStyle: {
    color: Colors.primaryColor,
    fontSize: 10,
    fontWeight: 'bold'
  },
  statusPaidStyle: {
    color: Colors.successColor,
    fontWeight: 'bold',
    fontSize: 10
  },
  submissionViewStyle: {
    backgroundColor: Colors.fadedEffectColor,
    marginTop: hp('1%'),
    marginBottom: hp('2%'),
    marginHorizontal: wp('6%'),
    borderRadius: 20,
    paddingTop: 20
  },
  submitButtonStyle: {
    marginTop: hp('3%'),
    marginHorizontal: 7,
    backgroundColor: Colors.successColor,
    alignItems: 'center',
    padding: 8,
    width: wp('38%'),
    borderRadius: 5
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

export default JobCard
