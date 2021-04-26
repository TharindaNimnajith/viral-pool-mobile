import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import Menu from '../../../components/buttons/menu-button'
import Logout from '../../../components/buttons/logout-button'

const NewProjectListScreen = props => {
  const onEditButtonPress = async () => {
    props.navigation.navigate('NewProjectDetails')
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.viewStyle}>
          <TouchableOpacity style={styles.buttonStyle}
                            onPress={onEditButtonPress}>
            <Text style={styles.buttonTextStyle}>
              New Project Details
            </Text>
          </TouchableOpacity>
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
  mainViewStyle: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: Colors.secondaryColor
  },
  viewStyle: {
    alignItems: 'center'
  }
})

NewProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'NEW PROJECTS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default NewProjectListScreen
