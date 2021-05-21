import React from 'react'
import {Image, StyleSheet, View} from 'react-native'
import {widthPercentageToDP as wp} from 'react-native-responsive-screen'
import Menu from "./menu-button";
import DashboardLogo from "./dashboard-logo";

const DashboardHeader = () => {
  return (
    <View>
      <Menu navigation={navData.navigation}/>
      <DashboardLogo/>
    </View>
  )
}

export default DashboardHeader
