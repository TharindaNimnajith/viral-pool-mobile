import React, {useEffect, useState} from 'react'
import {FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
// import {heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Colors from '../../../shared/colors'
import Menu from '../../../components/buttons/menu-button'
import Logout from '../../../components/buttons/logout-button'
// import {CompletedProjects} from '../../../data/project-data/completed-project-data'


const CompletedProjectListScreen = props => {
  const onEditButtonPress = async () => {
    props.navigation.navigate('CompletedProjectDetails')
  }

  // let orders = CompletedProjects
  //
  // const [refresh, setRefresh] = useState(false)
  //
  // const renderItemsFunction = (itemData) => {
  //   return (
  //     <OrderListItem navigation={navigation}
  //                    itemData={itemData}
  //                    refreshFunction={refreshFunction}/>
  //   )
  // }
  //
  // const refreshFunction = () => {
  //   setRefresh(true)
  // }
  //
  // useEffect(() => {
  //   setRefresh(false)
  // }, [refresh]);

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.viewStyle}>
          <TouchableOpacity style={styles.buttonStyle}
                            onPress={onEditButtonPress}>
            <Text style={styles.buttonTextStyle}>
              Completed Project Details
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
    // <View style={styles.list}>
    //   <FlatList keyExtractor={(item, index) => index.toString()}
    //             data={orders}
    //             numColumns={1}
    //             renderItem={renderItemsFunction}/>
    // </View>
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
  },
  // list: {
  //   marginTop: 5,
  //   width: wp('100%'),
  //   backgroundColor: Colors.secondaryColor
  // }
})

CompletedProjectListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'COMPLETED PROJECTS',
    headerLeft: () => <Menu navigation={navData.navigation}/>,
    headerRight: () => <Logout navigation={navData.navigation}/>
  }
}

export default CompletedProjectListScreen
