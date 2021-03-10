import React from 'react'
import {StyleSheet} from 'react-native'
import {HeaderButton} from 'react-navigation-header-buttons'
import Icon from 'react-native-vector-icons/Ionicons'
import Colors from './../shared/colors'

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton {...props}
                  IconComponent={Icon}
                  iconSize={25}
                  color={Colors.secondaryColor}
                  buttonStyle={styles.buttonStyle}/>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
    marginLeft: 20
  }
})

export default CustomHeaderButton
