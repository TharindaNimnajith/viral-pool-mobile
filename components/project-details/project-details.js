import React, {useEffect, useState} from 'react'
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, useWindowDimensions, View} from 'react-native'
import HTML from 'react-native-render-html'
import axios from 'axios'
import Colors from '../../util/colors'
import {heightPercentageToDP as hp} from "react-native-responsive-screen";

const ProjectDetails = props => {
  const contentWidth = useWindowDimensions().width

  const project = props.project.navigation.getParam('project')

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

  useEffect(() => {
    setLoading(false)
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
      }
      setLoading(false)
    }).catch(async error => {
      setLoading(false)
      console.log(error)
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
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
            <HTML contentWidth={contentWidth}
                  source={{
                    html: description
                  }}/>
          </View>
          {
            loading ? (
              <View style={styles.loadingStyle}>
                <ActivityIndicator size='large'
                                   color={Colors.secondaryColor}/>
              </View>
            ) : null
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
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

export default ProjectDetails
