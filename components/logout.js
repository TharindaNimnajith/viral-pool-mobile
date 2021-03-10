import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './header-button'

const Logout = props => {
  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Logout'
            iconName='log-out-outline'
            onPress={() => {
              props.navigation.navigate('Login')
            }}/>
    </HeaderButtons>
  )
}

export default Logout
