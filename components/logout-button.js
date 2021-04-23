import React, {useState} from 'react'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {View} from 'react-native'
import Dialog from 'react-native-dialog'
import CustomHeaderButton from './custom-header-button'

const Logout = props => {
  const [visible, setVisible] = useState(false)

  const showDialog = async () => {
    setVisible(true)
  }

  const hideDialog = async () => {
    setVisible(false)
  }

  const handleLogout = async () => {
    props.navigation.navigate('Login')
  }

  return (
    <View>
      <Dialog.Container visible={visible}>
        <Dialog.Title>
          LOGOUT
        </Dialog.Title>
        <Dialog.Description>
          Are you sure?
        </Dialog.Description>
        <Dialog.Button label='Yes'
                       onPress={handleLogout}/>
        <Dialog.Button label='No'
                       onPress={hideDialog}/>
      </Dialog.Container>
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title='Logout'
              iconName='log-out-outline'
              onPress={showDialog}/>
      </HeaderButtons>
    </View>
  )
}

export default Logout
