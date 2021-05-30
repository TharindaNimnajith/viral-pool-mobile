import React, {useCallback, useEffect, useState} from 'react'
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
import {Entypo, Ionicons} from '@expo/vector-icons'
import axios from 'axios'
import {
  contentSubmissionStatusEnum,
  jobAcceptationStatusEnum,
  resultSubmissionStatusEnum
} from '../../shared/const/enums'
import Colors from '../../shared/const/colors'
import Constants from '../../shared/const/constants'
import {showAlert, showErrors} from '../../shared/util/helpers'
import FileListItem from './file-list-item'

const ProjectDetails = props => {
  const contentWidth = useWindowDimensions().width

  const project = props.project.navigation.getParam('project')

  const [name, setName] = useState('')
  const [description, setDescription] = useState(null)
  const [projectFileResponses, setProjectFileResponses] = useState([])
  const [createdDate, setCreatedDate] = useState('')
  const [createdUserFirstName, setCreatedUserFirstName] = useState('')
  const [createdUserLastName, setCreatedUserLastName] = useState('')
  const [socialMediaPlatformName, setSocialMediaPlatformName] = useState('')
  const [complexity, setComplexity] = useState('')
  const [amount, setAmount] = useState('')
  const [isContentGivenByStrategyMember, setIsContentGivenByStrategyMember] = useState(false)
  const [jobAcceptationStatus, setJobAcceptationStatus] = useState(jobAcceptationStatusEnum.Pending)
  const [contentCreatorSubmissionResponses, setContentCreatorSubmissionResponses] = useState([])
  const [contentSubmissionLink, setContentSubmissionLink] = useState('')
  const [resultSubmissionLink, setResultSubmissionLink] = useState('')
  const [contentSubmissionStatus, setContentSubmissionStatus] = useState(contentSubmissionStatusEnum.Default)
  const [resultSubmissionStatus, setResultSubmissionStatus] = useState(resultSubmissionStatusEnum.Default)
  const [contentSubmissionLinkValid, setContentSubmissionLinkValid] = useState(false)
  const [resultSubmissionLinkValid, setResultSubmissionLinkValid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [visibleAccept, setVisibleAccept] = useState(false)
  const [visibleReject, setVisibleReject] = useState(false)
  const [visibleContentSubmit, setVisibleContentSubmit] = useState(false)
  const [visibleContentDelete, setVisibleContentDelete] = useState(false)
  const [visibleResultSubmit, setVisibleResultSubmit] = useState(false)
  const [visibleResultDelete, setVisibleResultDelete] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    setLoading(true)
    setRefresh(false)
    project.refresh()
    axios.get(`project-cc-strategy/${project.project}`).then(async response => {
      setLoading(false)
      if (response.status === 200) {
        setName(response.data.data.name)
        setDescription(response.data.data.description)
        setProjectFileResponses(response.data.data.projectFileResponses)
        setCreatedDate(response.data.data.createdDate)
        setCreatedUserFirstName(response.data.data.createdUser.firstName)
        setCreatedUserLastName(response.data.data.createdUser.lastName)
        setSocialMediaPlatformName(response.data.data.socialMediaPlatformName)
        setComplexity(response.data.data.complexity)
        setAmount(response.data.data.amount)
        setIsContentGivenByStrategyMember(response.data.data.isContentGivenByStrategyMember)
        setJobAcceptationStatus(response.data.data.jobAcceptationStatus)
        setContentCreatorSubmissionResponses(response.data.data.contentCreatorSubmissionResponses)
        setContentSubmissionLink(response.data.data.contentSubmissionLink)
        setResultSubmissionLink(response.data.data.resultSubmissionLink)
        setContentSubmissionStatus(response.data.data.contentSubmissionStatus)
        setResultSubmissionStatus(response.data.data.resultSubmissionStatus)
        setContentSubmissionLinkValid(response.data.data.contentSubmissionStatus !==
          contentSubmissionStatusEnum.Default)
        setResultSubmissionLinkValid(response.data.data.resultSubmissionStatus !==
          contentSubmissionStatusEnum.Default)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }, [refresh])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    axios.get(`project-cc-strategy/${project.project}`).then(async response => {
      if (response.status === 200) {
        setName(response.data.data.name)
        setDescription(response.data.data.description)
        setProjectFileResponses(response.data.data.projectFileResponses)
        setCreatedDate(response.data.data.createdDate)
        setCreatedUserFirstName(response.data.data.createdUser.firstName)
        setCreatedUserLastName(response.data.data.createdUser.lastName)
        setSocialMediaPlatformName(response.data.data.socialMediaPlatformName)
        setComplexity(response.data.data.complexity)
        setAmount(response.data.data.amount)
        setIsContentGivenByStrategyMember(response.data.data.isContentGivenByStrategyMember)
        setJobAcceptationStatus(response.data.data.jobAcceptationStatus)
        setContentCreatorSubmissionResponses(response.data.data.contentCreatorSubmissionResponses)
        setContentSubmissionLink(response.data.data.contentSubmissionLink)
        setResultSubmissionLink(response.data.data.resultSubmissionLink)
        setContentSubmissionStatus(response.data.data.contentSubmissionStatus)
        setResultSubmissionStatus(response.data.data.resultSubmissionStatus)
        setContentSubmissionLinkValid(response.data.data.contentSubmissionStatus !==
          contentSubmissionStatusEnum.Default)
        setResultSubmissionLinkValid(response.data.data.resultSubmissionStatus !==
          contentSubmissionStatusEnum.Default)
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
    wait(2000).then(() => {
      setRefreshing(false)
    })
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
      strategyId: project.project
    }
    axios.put('project-cc-strategy/accept', data).then(async response => {
      project.refresh()
      setLoading(false)
      setRefresh(true)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.ACCEPTED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const rejectJob = async () => {
    setVisibleReject(false)
    setLoading(true)
    let data = {
      strategyId: project.project
    }
    axios.put('project-cc-strategy/reject', data).then(async response => {
      project.refresh()
      setLoading(false)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.REJECTED)
        props.project.navigation.navigate('NewProjectList')
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const contentSubmit = async contentSubmissionLink => {
    setVisibleContentSubmit(false)
    setLoading(true)
    let data = {
      id: project.project,
      contentLink: contentSubmissionLink
    }
    axios.put('project-cc-strategy/content-link', data).then(async response => {
      project.refresh()
      setLoading(false)
      setRefresh(true)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const contentDelete = async () => {
    setVisibleContentDelete(false)
    setLoading(true)
    let data = {
      id: project.project,
      contentLink: null
    }
    axios.put('project-cc-strategy/content-link', data).then(async response => {
      project.refresh()
      setLoading(false)
      setRefresh(true)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const resultSubmit = async resultSubmissionLink => {
    setVisibleResultSubmit(false)
    setLoading(true)
    let data = {
      id: project.project,
      resultLink: resultSubmissionLink
    }
    axios.put('project-cc-strategy/result-link', data).then(async response => {
      project.refresh()
      setLoading(false)
      setRefresh(true)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const resultDelete = async () => {
    setVisibleResultDelete(false)
    setLoading(true)
    let data = {
      id: project.project,
      resultLink: null
    }
    axios.put('project-cc-strategy/result-link', data).then(async response => {
      project.refresh()
      setLoading(false)
      setRefresh(true)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showErrors(error.response.data)
      console.log(error.response.data)
    })
  }

  const onChangeContentSubmissionLink = async contentSubmissionLink => {
    setContentSubmissionLinkValid(contentSubmissionLink.trim().length > 0)
    setContentSubmissionLink(contentSubmissionLink)
  }

  const onChangeResultSubmissionLink = async resultSubmissionLink => {
    setResultSubmissionLinkValid(resultSubmissionLink.trim().length > 0)
    setResultSubmissionLink(resultSubmissionLink)
  }

  function isDisabledContentSubmit() {
    return !contentSubmissionLinkValid
  }

  function isDisabledContentDelete() {
    return !contentSubmissionLinkValid
  }

  function isDisabledResultSubmit() {
    return !resultSubmissionLinkValid
  }

  function isDisabledResultDelete() {
    return !resultSubmissionLinkValid
  }

  const setLoadingTrue = async () => {
    setLoading(true)
  }

  const setLoadingFalse = async () => {
    setLoading(false)
  }

  return (
    <SafeAreaView>
      <Dialog.Container visible={visibleAccept}
                        onBackdropPress={hideDialogAccept}>
        <Dialog.Title>
          ACCEPT JOB
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={acceptJob}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialogAccept}/>
      </Dialog.Container>
      <Dialog.Container visible={visibleReject}
                        onBackdropPress={hideDialogReject}>
        <Dialog.Title>
          REJECT JOB
        </Dialog.Title>
        <Dialog.Description>
          {Constants.CONFIRMATION}
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       color={Colors.primaryColor}
                       onPress={rejectJob}/>
        <Dialog.Button label='No'
                       color={Colors.primaryColor}
                       onPress={hideDialogReject}/>
      </Dialog.Container>
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
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <View style={styles.viewStyle}>
            <Text style={styles.titleStyle}>
              {name}
            </Text>
            <Text style={styles.titleStyle}>
              {createdDate.slice(0, 10)}
            </Text>
            <Text style={styles.titleStyle}>
              {socialMediaPlatformName}
            </Text>
          </View>
          <View style={styles.lineStyle}/>
          {
            description &&
            <View style={styles.viewStyle}>
              <Text style={styles.titleStyle}>
                Strategy
              </Text>
              <HTML contentWidth={contentWidth}
                    source={{
                      html: description
                    }}/>
            </View>
          }
          {
            projectFileResponses.length > 0 &&
            <View style={styles.viewStyle}>
              <Text style={styles.titleStyle}>
                Samples
              </Text>
              <View style={styles.fileStyle}>
                {
                  projectFileResponses.map((file, key) =>
                    <FileListItem key={key}
                                  itemData={file}
                                  setLoadingTrue={setLoadingTrue}
                                  setLoadingFalse={setLoadingFalse}/>
                  )
                }
              </View>
            </View>
          }
          {
            // jobAcceptationStatus === jobAcceptationStatusEnum.Pending &&
            <View style={styles.centerViewStyle}>
              <View style={styles.horizontalStyle}>
                <TouchableOpacity style={styles.deleteButtonStyle}
                                  onPress={showDialogReject}>
                  <View style={styles.horizontalStyle}>
                    <Entypo name='cross'
                            size={24}
                            color={Colors.secondaryColor}/>
                    <Text style={styles.buttonTextStyle}>
                      Reject
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.acceptButtonStyle}
                                  onPress={showDialogAccept}>
                  <View style={styles.horizontalStyle}>
                    <Ionicons name='checkmark'
                              size={24}
                              color={Colors.secondaryColor}/>
                    <Text style={styles.buttonTextStyle}>
                      Accept
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          }
          {
            // jobAcceptationStatus === jobAcceptationStatusEnum.Accepted && !isContentGivenByStrategyMember &&
            <View style={styles.centerViewStyle}>
              <Text style={styles.labelStyle}>
                Content Submission Link
              </Text>
              <TextInput style={styles.textInputStyle}
                         onChangeText={contentSubmissionLink => onChangeContentSubmissionLink(contentSubmissionLink)}
                         value={contentSubmissionLink}
                         placeholder='Enter URL'
                         placeholderTextColor={Colors.tertiaryColor}
                         editable={contentSubmissionStatus !== contentSubmissionStatusEnum.Approved}/>
              {
                contentSubmissionStatus !== contentSubmissionStatusEnum.Approved &&
                <View>
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
            </View>
          }
          {
            // ((jobAcceptationStatus === jobAcceptationStatusEnum.Accepted && isContentGivenByStrategyMember) ||
            //   (jobAcceptationStatus === jobAcceptationStatusEnum.Accepted &&
            //     contentSubmissionStatus === contentSubmissionStatusEnum.Approved)) &&
            <View style={styles.centerViewStyle}>
              <Text style={styles.labelStyle}>
                Result Submission Link
              </Text>
              <TextInput style={styles.textInputStyle}
                         onChangeText={resultSubmissionLink => onChangeResultSubmissionLink(resultSubmissionLink)}
                         value={resultSubmissionLink}
                         placeholder='Enter URL'
                         placeholderTextColor={Colors.tertiaryColor}
                         editable={resultSubmissionStatus !== resultSubmissionStatusEnum.Approved}/>
              {
                resultSubmissionStatus !== resultSubmissionStatusEnum.Approved &&
                <View>
                  <TouchableOpacity style={isDisabledResultSubmit() ? styles.buttonDisabledStyle : styles.buttonStyle}
                                    disabled={isDisabledResultSubmit()}
                                    onPress={showDialogResultSubmit}>
                    <Text style={styles.buttonTextStyle}>
                      Submit
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={isDisabledResultDelete() ? styles.buttonDisabledStyle : styles.deleteButtonStyle}
                    disabled={isDisabledResultDelete()}
                    onPress={showDialogResultDelete}>
                    <Text style={styles.buttonTextStyle}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              }
            </View>
          }
        </View>
        {
          loading &&
          <View style={styles.loadingStyle}>
            <ActivityIndicator size='large'
                               color={Colors.secondaryColor}/>
          </View>
        }
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  acceptButtonStyle: {
    marginTop: 30,
    backgroundColor: Colors.successColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonStyle: {
    marginTop: 15,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  buttonDisabledStyle: {
    marginTop: 15,
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
  centerViewStyle: {
    alignItems: 'center',
    marginBottom: 30
  },
  deleteButtonStyle: {
    marginTop: 15,
    backgroundColor: Colors.primaryColor,
    alignItems: 'center',
    padding: 10,
    width: wp('80%'),
    borderRadius: 5
  },
  fileStyle: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 10
  },
  horizontalStyle: {
    flexDirection: 'row'
  },
  labelStyle: {
    marginTop: 20,
    color: Colors.primaryColor,
    alignSelf: 'baseline',
    marginLeft: wp('10%')
  },
  lineStyle: {
    borderBottomColor: Colors.tertiaryColor,
    borderBottomWidth: 1,
    marginLeft: wp('10%'),
    marginRight: wp('10%')
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
    minHeight: hp('100%')
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
  titleStyle: {
    color: Colors.primaryColor,
    fontSize: 18
  },
  viewStyle: {
    marginHorizontal: wp('9%'),
    marginVertical: wp('2%')
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default ProjectDetails
