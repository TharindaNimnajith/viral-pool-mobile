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
import axios from 'axios'
import {contentSubmissionStatusEnum, jobAcceptationStatusEnum, resultSubmissionStatusEnum} from '../util/enum'
import Colors from '../util/colors'
import Constants from '../util/constants'
import {isEmpty, showAlert} from '../util/common-helpers'
import FileListItem from './file-list-item'

const ProjectDetails = props => {
  const contentWidth = useWindowDimensions().width

  const project = props.project.navigation.getParam('project')

  const [name, setName] = useState('')
  const [description, setDescription] = useState(null)
  const [projectFileResponses, setProjectFileResponses] = useState([])
  const [createdDate, setCreatedDate] = useState('')
  const [socialMediaPlatformName, setSocialMediaPlatformName] = useState('')
  const [isContentGivenByStrategyMember, setIsContentGivenByStrategyMember] = useState(false)
  const [contentSubmissionLink, setContentSubmissionLink] = useState('')
  const [resultSubmissionLink, setResultSubmissionLink] = useState('')
  const [jobAcceptationStatus, setJobAcceptationStatus] = useState(jobAcceptationStatusEnum.Pending)
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

  useEffect(() => {
    setLoading(true)
    project.refresh()
    axios.get(`project-cc-strategy/${project.project}`).then(async response => {
      setLoading(false)
      console.log(response.data.data.projectFileResponses)
      if (response.status === 200) {
        setName(response.data.data.name)
        setDescription(response.data.data.description)
        setProjectFileResponses(response.data.data.projectFileResponses)
        setCreatedDate(response.data.data.createdDate)
        setSocialMediaPlatformName(response.data.data.socialMediaPlatformName)
        setIsContentGivenByStrategyMember(response.data.data.isContentGivenByStrategyMember)
        setContentSubmissionLink(response.data.data.contentSubmissionLink)
        setResultSubmissionLink(response.data.data.resultSubmissionLink)
        setJobAcceptationStatus(response.data.data.jobAcceptationStatus)
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
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    project.refresh()
    axios.get(`project-cc-strategy/${project.project}`).then(async response => {
      if (response.status === 200) {
        setName(response.data.data.name)
        setDescription(response.data.data.description)
        setProjectFileResponses(response.data.data.projectFileResponses)
        setCreatedDate(response.data.data.createdDate)
        setSocialMediaPlatformName(response.data.data.socialMediaPlatformName)
        setIsContentGivenByStrategyMember(response.data.data.isContentGivenByStrategyMember)
        setContentSubmissionLink(response.data.data.contentSubmissionLink)
        setResultSubmissionLink(response.data.data.resultSubmissionLink)
        setJobAcceptationStatus(response.data.data.jobAcceptationStatus)
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
      id: project.project
    }
    axios.put('project-cc-strategy/accept', data).then(async response => {
      project.refresh()
      setLoading(false)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.ACCEPTED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const rejectJob = async () => {
    setVisibleReject(false)
    setLoading(true)
    let data = {
      id: project.project
    }
    axios.put('project-cc-strategy/reject', data).then(async response => {
      project.refresh()
      setLoading(false)
      if (response.status === 200) {
        await showAlert(Constants.SUCCESS, Constants.REJECTED)
        props.navigation.navigate('NewProjectList')
      } else {
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      }
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const contentSubmit = async () => {
    setVisibleContentSubmit(false)
    setLoading(true)
    let data = {
      id: project.project,
      contentLink: contentSubmissionLink
    }
    axios.put('project-cc-strategy/content-link', data).then(async response => {
      project.refresh()
      setLoading(false)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
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
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const resultSubmit = async () => {
    setVisibleResultSubmit(false)
    setLoading(true)
    let data = {
      id: project.project,
      resultLink: resultSubmissionLink
    }
    axios.put('project-cc-strategy/result-link', data).then(async response => {
      project.refresh()
      setLoading(false)
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.SUBMITTED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
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
      if (response.status === 200)
        await showAlert(Constants.SUCCESS, Constants.DELETED)
      else
        await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
    }).catch(async error => {
      project.refresh()
      setLoading(false)
      await showAlert(Constants.ERROR, Constants.COMMON_ERROR)
      console.log(error)
    })
  }

  const onChangeContentSubmissionLink = async contentSubmissionLink => {
    setContentSubmissionLinkValid(!await isEmpty(contentSubmissionLink.trim()))
    setContentSubmissionLink(contentSubmissionLink)
  }

  const onChangeResultSubmissionLink = async resultSubmissionLink => {
    setResultSubmissionLinkValid(!await isEmpty(resultSubmissionLink.trim()))
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
                                  itemData={file}/>
                  )
                }
              </View>
            </View>
          }
          {
            jobAcceptationStatus === jobAcceptationStatusEnum.Pending &&
            <View style={styles.centerViewStyle}>
              <TouchableOpacity style={styles.acceptButtonStyle}
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
            jobAcceptationStatus === jobAcceptationStatusEnum.Accepted && !isContentGivenByStrategyMember &&
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
            jobAcceptationStatus === jobAcceptationStatusEnum.Accepted &&
            contentSubmissionStatus === contentSubmissionStatusEnum.Approved &&
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
    backgroundColor: Colors.errorColor,
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
    marginLeft: wp('9%'),
    marginRight: wp('9%'),
    marginTop: wp('2%'),
    marginBottom: wp('2%')
  }
})

const wait = timeout => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout)
  })
}

export default ProjectDetails
