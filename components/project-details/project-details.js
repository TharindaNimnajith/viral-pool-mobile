import React, {useCallback, useEffect, useState} from 'react'
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Dialog from 'react-native-dialog'
import HTML from 'react-native-render-html'
import axios from 'axios'
import Colors from '../../util/colors'
import Constants from '../../util/constants'
import {showAlert} from '../../util/common-helpers'

const ProjectDetails = props => {
  const contentWidth = useWindowDimensions().width

  const [id, setId] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState(`<p></p>`)
  const [createdDate, setCreatedDate] = useState('')
  const [socialMediaPlatformName, setSocialMediaPlatformName] = useState('')
  const [contentSubmissionLink, setContentSubmissionLink] = useState('')
  const [resultSubmissionLink, setResultSubmissionLink] = useState('')
  const [isContentGivenByStrategyMember, setIsContentGivenByStrategyMember] = useState(false)
  const [jobAcceptationStatus, setJobAcceptationStatus] = useState(0)
  const [contentSubmissionStatus, setContentSubmissionStatus] = useState(0)
  const [resultSubmissionStatus, setResultSubmissionStatus] = useState(0)
  const [loading, setLoading] = useState(false)
  const [visibleAccept, setVisibleAccept] = useState(false)
  const [visibleReject, setVisibleReject] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const project = props.project.navigation.getParam('project')

  useEffect(() => {
    setLoading(true)
    axios.get(`project-cc-strategy/${project}`).then(async response => {
      if (response.status === 200) {
        setId(response.data.data.id)
        setName(response.data.data.name)
        setDescription(response.data.data.description)
        setCreatedDate(response.data.data.createdDate)
        setSocialMediaPlatformName(response.data.data.socialMediaPlatformName)
        setContentSubmissionLink(response.data.data.contentSubmissionLink)
        setResultSubmissionLink(response.data.data.resultSubmissionLink)
        setIsContentGivenByStrategyMember(response.data.data.isContentGivenByStrategyMember)
        setJobAcceptationStatus(response.data.data.jobAcceptationStatus)
        setContentSubmissionStatus(response.data.data.contentSubmissionStatus)
        setResultSubmissionStatus(response.data.data.resultSubmissionStatus)
        setLoading(false)
      } else {
        setLoading(false)
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

  const acceptJob = async () => {
    setVisibleAccept(false)
    setLoading(true)
    axios.put('').then(async response => {
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
    axios.put('').then(async response => {
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
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing}
                        onRefresh={onRefresh}/>
      }>
        <View style={styles.mainViewStyle}>
          <Text>
            {id}
          </Text>
          <Text>
            {name}
          </Text>
          <Text>
            {createdDate}
          </Text>
          <Text>
            {socialMediaPlatformName}
          </Text>
          <Text>
            {contentSubmissionLink}
          </Text>
          <Text>
            {resultSubmissionLink}
          </Text>
          <Text>
            {isContentGivenByStrategyMember.toString()}
          </Text>
          <Text>
            {jobAcceptationStatus}
          </Text>
          <Text>
            {contentSubmissionStatus}
          </Text>
          <Text>
            {resultSubmissionStatus}
          </Text>
          <View style={styles.viewStyle}>
            {
              description &&
              <HTML contentWidth={contentWidth}
                    source={{
                      html: description
                    }}/>
            }
          </View>
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
