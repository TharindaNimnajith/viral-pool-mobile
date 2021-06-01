import React from 'react'
import {StyleSheet} from 'react-native'
import Colors from '../../../shared/const/colors'

export const styles = StyleSheet.create({
  focusedTabTextStyle: {
    color: Colors.primaryColor,
    marginTop: 3
  },
  tabBarIndicatorStyle: {
    backgroundColor: Colors.primaryColor
  },
  tabBarStyle: {
    backgroundColor: Colors.secondaryColor
  },
  unfocusedTabTextStyle: {
    color: Colors.tertiaryColor,
    marginTop: 3
  }
})
