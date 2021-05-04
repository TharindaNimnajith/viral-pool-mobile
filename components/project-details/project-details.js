import React from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View
} from 'react-native'
import HTML from 'react-native-render-html'
import Colors from '../../shared/colors'
import {widthPercentageToDP as wp} from "react-native-responsive-screen";

const ProjectDetails = props => {
  const contentWidth = useWindowDimensions().width

  // const htmlContent = `
  //   <h1>This HTML snippet is now rendered with native components!</h1>
  //   <h2>Enjoy a webview-free and blazing fast application</h2>
  //   <img src='https://i.imgur.com/dHLmxfO.jpg?2'
  //        alt=''/>
  //   <em style='textAlign: center;'>
  //       Look at how happy this native cat is
  //   </em>`

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.mainViewStyle}>
          <View style={styles.viewStyle}>
            <HTML contentWidth={contentWidth}
                  source={{
                    html: props.project.project.description
                  }}/>
          </View>
          <View>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>
                Approve
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonTextStyle}>
                Reject
              </Text>
            </TouchableOpacity>
          </View>
          {
            props.project.project.isContentGivenByStrategyMember ? (
              <View>
                <TextInput style={styles.textInputStyle}
                           placeholder='Enter Submission'
                           placeholderTextColor={Colors.tertiaryColor}
                           secureTextEntry={false}
                disabled={true}/>
              </View>
            ) : (
              <View>
                <TextInput style={styles.textInputStyle}
                           placeholder='Enter Submission'
                           placeholderTextColor={Colors.tertiaryColor}
                           secureTextEntry={false}
                           disabled={false}/>
              </View>
            )
          }
          {
            props.project.project.isSubmissionApproved ? (
              <View>
                <TextInput style={styles.textInputStyle}
                           placeholder='Enter Results'
                           placeholderTextColor={Colors.tertiaryColor}
                           secureTextEntry={false}
                           disabled={false}/>
              </View>
            ) : (
              <View>
                <TextInput style={styles.textInputStyle}
                           placeholder='Enter Results'
                           placeholderTextColor={Colors.tertiaryColor}
                           secureTextEntry={false}
                           disabled={true}/>
              </View>
            )
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  mainViewStyle: {
    backgroundColor: Colors.secondaryColor,
    flex: 1

  },
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
  viewStyle: {
    margin: 20
  }
})

export default ProjectDetails
