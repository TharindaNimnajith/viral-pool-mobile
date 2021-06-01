import React, {useState} from 'react'
import {Text, useWindowDimensions} from 'react-native'
import {SceneMap, TabBar, TabView} from 'react-native-tab-view'
import {Ionicons} from '@expo/vector-icons'
import {tabs} from '../../../shared/util/helpers'
import CombinedButtons from '../../../components/header/combined-buttons/combined-buttons'
import PersonalDetailsRoute from '../../../components/profile/personal-details-route/personal-details-route'
import PaymentDetailsRoute from '../../../components/profile/payment-details-route/payment-details-route'
import Colors from '../../../shared/const/colors'
import {styles} from './edit-profile-screen-styles'

const renderScene = SceneMap({
  personalDetails: PersonalDetailsRoute,
  paymentDetails: PaymentDetailsRoute
})

const EditProfileScreen = () => {
  const layout = useWindowDimensions()

  const [index, setIndex] = useState(0)
  const [routes] = useState(tabs)

  return (
    <TabView navigationState={{index, routes}}
             renderScene={renderScene}
             onIndexChange={setIndex}
             tabBarPosition='top'
             keyboardDismissMode='auto'
             swipeEnabled={true}
             lazyPreloadDistance={0}
             lazy={() => false}
             renderLazyPlaceholder={() => null}
             onSwipeStart={() => null}
             onSwipeEnd={() => null}
             initialLayout={{
               width: layout.width
             }}
             renderTabBar={
               props => (
                 <TabBar {...props}
                         indicatorStyle={styles.tabBarIndicatorStyle}
                         style={styles.tabBarStyle}
                         getAccessible={() => true}
                         getLabelText={({route}) => route.title}
                         getAccessibilityLabel={({route}) => route.accessibilityLabel}
                         getTestID={({route}) => route.testID}
                         renderIcon={({route, focused}) => (
                           <Ionicons name={focused ? route.iconFocused : route.icon}
                                     color={focused ? Colors.primaryColor : Colors.tertiaryColor}
                                     size={20}/>
                         )}
                         renderLabel={({route, focused}) => (
                           <Text style={focused ? styles.focusedTabTextStyle : styles.unfocusedTabTextStyle}>
                             {route.title}
                           </Text>
                         )}/>
               )}/>
  )
}

EditProfileScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Update Profile',
    headerRight: () => (
      <CombinedButtons navigation={navData.navigation}/>
    )
  }
}

export default EditProfileScreen
