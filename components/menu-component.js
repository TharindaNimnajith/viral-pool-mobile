import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import HeaderButton from './header-button-component'

const Menu = props => {
  const toggleDrawer = async () => {
    props.navigation.toggleDrawer()
  }

  return (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu'
            iconName='menu'
            onPress={toggleDrawer}/>
    </HeaderButtons>
  )
}

export default Menu
