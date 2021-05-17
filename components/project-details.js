import React, {useCallback, useContext, useState} from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Dialog from 'react-native-dialog'
import HTML from 'react-native-render-html'
import axios from 'axios'
import {AppContext} from '../util/app-context'
import Colors from '../util/colors'
import Constants from '../util/constants'
import {isEmpty, showAlert} from '../util/common-helpers'

const ProjectDetails = props => {
  const appContext = useContext(AppContext)

  const contentWidth = useWindowDimensions().width

  const [contentSubmissionLinkValid, setContentSubmissionLinkValid] =
    useState(appContext.projectDetails.contentSubmissionStatus !== 0)
  const [resultSubmissionLinkValid, setResultSubmissionLinkValid] =
    useState(appContext.projectDetails.resultSubmissionStatus !== 0)
  const [loading, setLoading] = useState(false)
  const [visibleAccept, setVisibleAccept] = useState(false)
  const [visibleReject, setVisibleReject] = useState(false)
  const [visibleContentSubmit, setVisibleContentSubmit] = useState(false)
  const [visibleContentDelete, setVisibleContentDelete] = useState(false)
  const [visibleResultSubmit, setVisibleResultSubmit] = useState(false)
  const [visibleResultDelete, setVisibleResultDelete] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    wait(2000).then(() => setRefreshing(false))
  }, [])

  const showDialogAccept = async () => {
    setVisibleAccept(true)
  }

  const hideDialogAccept = async () => {
    setVisibleAccept(false)
  }

  const showDialogReject = async () => {
    setVisibleReject(true)
  }

  const hideDialogReject = async () => {
    setVisibleReject(false)
  }

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

  const acceptJob = async () => {
    setVisibleAccept(false)
    setLoading(true)
    let data = {
      id: appContext.projectDetails.id
    }
    axios.put('project-cc-strategy/accept', data).then(async response => {
      if (response.status === 200) {
        setLoading(false)
        await showAlert(Constants.SUCCESS, Constants.ACCEPTED)
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const rejectJob = async () => {
    setVisibleReject(false)
    setLoading(true)
    let data = {
      id: appContext.projectDetails.id
    }
    axios.put('project-cc-strategy/reject', data).then(async response => {
      if (response.status === 200) {
        setLoading(false)
        await showAlert(Constants.SUCCESS, Constants.REJECTED)
        props.navigation.navigate('NewProjectList')
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const contentSubmit = async () => {
    setVisibleContentSubmit(false)
    setLoading(true)
    let data = {
      id: appContext.projectDetails.id,
      contentLink: appContext.projectDetails.contentSubmissionLink
    }
    axios.put('project-cc-strategy/content-link', data).then(async response => {
      if (response.status === 200) {
        setLoading(false)
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const contentDelete = async () => {
    setVisibleContentDelete(false)
    setLoading(true)
    let data = {
      id: appContext.projectDetails.id,
      contentLink: null
    }
    axios.put('project-cc-strategy/content-link', data).then(async response => {
      if (response.status === 200) {
        setLoading(false)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const resultSubmit = async () => {
    setVisibleResultSubmit(false)
    setLoading(true)
    let data = {
      id: appContext.projectDetails.id,
      resultLink: appContext.projectDetails.resultSubmissionLink
    }
    axios.put('project-cc-strategy/result-link', data).then(async response => {
      if (response.status === 200) {
        setLoading(false)
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const resultDelete = async () => {
    setVisibleResultDelete(false)
    setLoading(true)
    let data = {
      id: appContext.projectDetails.id,
      resultLink: null
    }
    axios.put('project-cc-strategy/result-link', data).then(async response => {
      if (response.status === 200) {
        setLoading(false)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
      } else {
        setLoading(false)
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const onChangeContentSubmissionLink = async contentSubmissionLink => {
    setContentSubmissionLinkValid(!await isEmpty(contentSubmissionLink.trim()))
    // setContentSubmissionLink(contentSubmissionLink)
  }

  const onChangeResultSubmissionLink = async resultSubmissionLink => {
    setResultSubmissionLinkValid(!await isEmpty(resultSubmissionLink.trim()))
    // setResultSubmissionLink(resultSubmissionLink)
  }

  function isDisabledContentSubmit() {
    return !contentSubmissionLinkValid
  }

  function isDisabledContentDelete() {
    return false
  }

  function isDisabledResultSubmit() {
    return !resultSubmissionLinkValid
  }

  function isDisabledResultDelete() {
    return false
  }

  return (
    <SafeAreaView>
      <Dialog.Container visible={visibleAccept}>
        <Dialog.Title>
          ACCEPT JOB
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={acceptJob}/>
        <Dialog.Button label='No'
                       onPress={hideDialogAccept}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleReject}>
        <Dialog.Title>
          REJECT JOB
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={rejectJob}/>
        <Dialog.Button label='No'
                       onPress={hideDialogReject}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleContentSubmit}>
        <Dialog.Title>
          SUBMIT CONTENT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={contentSubmit}/>
        <Dialog.Button label='No'
                       onPress={hideDialogContentSubmit}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleContentDelete}>
        <Dialog.Title>
          DELETE CONTENT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={contentDelete}/>
        <Dialog.Button label='No'
                       onPress={hideDialogContentDelete}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleResultSubmit}>
        <Dialog.Title>
          SUBMIT RESULT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={resultSubmit}/>
        <Dialog.Button label='No'
                       onPress={hideDialogResultSubmit}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleResultDelete}>
        <Dialog.Title>
          DELETE RESULT
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={resultDelete}/>
        <Dialog.Button label='No'
                       onPress={hideDialogResultDelete}/>
      </Dialog.Container>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <Text>
            {appContext.projectDetails.id}
          </Text>
          <Text>
            {appContext.projectDetails.name}
          </Text>
          <Text>
            {appContext.projectDetails.createdDate}
          </Text>
          <Text>
            {appContext.projectDetails.socialMediaPlatformName}
          </Text>
          <View style={styles.viewStyle}>
            {
              appContext.projectDetails.description &&
              <HTML contentWidth={contentWidth}
                    source={{
                      html: appContext.projectDetails.description
                    }}/>
            }
          </View>
          {
            appContext.projectDetails.jobAcceptationStatus === 0 &&
            <View>
              <TouchableOpacity style={styles.buttonStyle}
                                onPress={showDialogAccept}>
                <Text style={styles.buttonTextStyle}>
                  Accept
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButtonStyle}
                                onPress={showDialogReject}>
                <Text style={styles.buttonTextStyle}>
                  Reject
                </Text>
              </TouchableOpacity>
            </View>
          }
          {
            appContext.projectDetails.jobAcceptationStatus === 1 &&
            <View>
              <Text style={styles.labelStyle}>
                Content Submission Link
              </Text>
              <TextInput style={styles.textInputStyle}
                         onChangeText={contentSubmissionLink => onChangeContentSubmissionLink(contentSubmissionLink)}
                         value={appContext.projectDetails.contentSubmissionLink}
                         placeholder='Enter URL'
                         placeholderTextColor={Colors.tertiaryColor}/>
              <TouchableOpacity style={isDisabledContentSubmit() ? styles.buttonDisabledStyle : styles.buttonStyle}
                                disabled={isDisabledContentSubmit()}
                                onPress={showDialogContentSubmit}>
                <Text style={styles.buttonTextStyle}>
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={isDisabledContentDelete()}
                                onPress={showDialogContentDelete}
                                style={isDisabledContentDelete() ? styles.buttonDisabledStyle
                                  : styles.deleteButtonStyle}>
                <Text style={styles.buttonTextStyle}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          }
          {
            appContext.projectDetails.jobAcceptationStatus === 1 &&
            appContext.projectDetails.contentSubmissionStatus === 1 &&
            <View>
              <Text style={styles.labelStyle}>
                Result Submission Link
              </Text>
              <TextInput style={styles.textInputStyle}
                         onChangeText={resultSubmissionLink => onChangeResultSubmissionLink(resultSubmissionLink)}
                         value={appContext.projectDetails.resultSubmissionLink}
                         placeholder='Enter URL'
                         placeholderTextColor={Colors.tertiaryColor}/>
              <TouchableOpacity style={isDisabledResultSubmit() ? styles.buttonDisabledStyle : styles.buttonStyle}
                                disabled={isDisabledResultSubmit()}
                                onPress={showDialogResultSubmit}>
                <Text style={styles.buttonTextStyle}>
                  Submit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={isDisabledResultDelete() ? styles.buttonDisabledStyle : styles.deleteButtonStyle}
                                disabled={isDisabledResultDelete()}
                                onPress={showDialogResultDelete}>
                <Text style={styles.buttonTextStyle}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          }
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
  deleteButtonStyle: {
    marginTop: 15,
    backgroundColor: Colors.errorColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
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
    backgroundColor: Colors.secondaryColor,
    alignItems: 'center',
    minHeight: hp('95%')
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
    margin: 25
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default ProjectDetails
