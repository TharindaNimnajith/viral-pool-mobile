import React from 'react'
import {StyleSheet} from 'react-native'
import {HeaderButton} from 'react-navigation-header-buttons'

const CustomHeaderButton = props => {
  return (
    <HeaderButton {...props}
                  iconSize={25}
                  buttonStyle={styles.buttonStyle}/>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20
  }
})

export default CustomHeaderButton
