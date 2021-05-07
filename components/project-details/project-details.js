import React, {useEffect, useState} from 'react'
import {ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native'
import axios from 'axios'
import Colors from '../../util/colors'

const ProjectDetails = props => {
  const project = props.project.navigation.getParam('project')

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(false)
    setLoading(true)
    axios.get(`project-cc-strategy/${id}`).then(async response => {
      if (response.status === 200)
        console.log(response)
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
            {project.title}
          </Text>
          <Text>
            {project.description}
          </Text>
          <Text>
            {project.status}
          </Text>
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
    alignItems: 'center'
  }
})

export default ProjectDetails
