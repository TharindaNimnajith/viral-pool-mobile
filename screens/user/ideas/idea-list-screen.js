import React from 'react'
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Menu from '../../../components/menu-button'
import Logout from '../../../components/logout-button'
import Colors from '../../../shared/colors'

const IdeaListScreen = props => {
  const onEditButtonPress = async () => {
    props.navigation.navigate('EditIdea')
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.viewStyle}>
          <TouchableOpacity style={styles.buttonStyle}
                            onPress={onEditButtonPress}>
            <Text style={styles.buttonTextStyle}>
              Edit Idea
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

IdeaListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'MY IDEAS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default IdeaListScreen
