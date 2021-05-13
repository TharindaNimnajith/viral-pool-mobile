import React from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from './custom-header-button'

const Menu = props => {
  const toggleDrawer = async () => {
    props.navigation.toggleDrawer()
  }

  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title='Menu'
            iconName='menu'
            onPress={toggleDrawer}/>
    </HeaderButtons>
  )
}

export default Menu
