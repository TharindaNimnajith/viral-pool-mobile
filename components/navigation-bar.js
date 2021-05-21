import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import Colors from '../util/colors'
import LoginScreen from '../screens/login-screen'
import DashboardScreen from '../screens/dashboard-screen'
import NotificationsScreen from '../screens/notifications-screen'
import NotificationProjectDetailsScreen from '../screens/notification-project-details-screen'
import ProfileScreen from '../screens/profile-screen'
import EditProfileScreen from '../screens/edit-profile-screen'
import EarningsScreen from '../screens/earnings-screen'
import IdeaListScreen from '../screens/idea-list-screen'
import AddIdeaScreen from '../screens/add-idea-screen'
import EditIdeaScreen from '../screens/edit-idea-screen'
import SocialMediaScreen from '../screens/social-media-screen'
import NewProjectListScreen from '../screens/new-project-list-screen'
import NewProjectDetailsScreen from '../screens/new-project-details-screen'
import OngoingProjectListScreen from '../screens/ongoing-project-list-screen'
import OngoingProjectDetailsScreen from '../screens/ongoing-project-details-screen'
import CompletedProjectListScreen from '../screens/completed-project-list-screen'
import CompletedProjectDetailsScreen from '../screens/completed-project-details-screen'

const LoginNavigator = createStackNavigator({
  Login: LoginScreen
}, {
  headerMode: 'none',
  navigationOptions: {
    headerVisible: false
  }
})

const DashboardNavigator = createStackNavigator({
  Dashboard: DashboardScreen
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.secondaryColor
  }
})

const NotificationsNavigator = createStackNavigator({
  Notifications: NotificationsScreen,
  NotificationProjectDetails: NotificationProjectDetailsScreen
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.secondaryColor
  }
})

const NewProjectsNavigator = createStackNavigator({
  NewProjectList: NewProjectListScreen,
  NewProjectDetails: NewProjectDetailsScreen
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.secondaryColor
  }
})

const OngoingProjectsNavigator = createStackNavigator({
  OngoingProjectList: OngoingProjectListScreen,
  OngoingProjectDetails: OngoingProjectDetailsScreen
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.secondaryColor
  }
})

const CompletedProjectsNavigator = createStackNavigator({
  CompletedProjectList: CompletedProjectListScreen,
  CompletedProjectDetails: CompletedProjectDetailsScreen
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.secondaryColor
  }
})

const EarningsNavigator = createStackNavigator({
  Earnings: EarningsScreen
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.secondaryColor
  }
})

const IdeasNavigator = createStackNavigator({
  IdeaList: IdeaListScreen,
  AddIdea: AddIdeaScreen,
  EditIdea: EditIdeaScreen
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.secondaryColor
  }
})

const SocialMediaNavigator = createStackNavigator({
  SocialMedia: SocialMediaScreen
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.secondaryColor
  }
})

const ProfileNavigator = createStackNavigator({
  Profile: ProfileScreen,
  EditProfile: EditProfileScreen
}, {
  defaultNavigationOptions: {
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.primaryColor
    },
    headerTintColor: Colors.secondaryColor
  }
})

const InternalNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardNavigator,
    navigationOptions: {
      drawerLabel: 'Dashboard',
      drawerIcon: <Ionicons name='home'
                            size={25}
                            color={Colors.secondaryColor}/>
    }
  },
  Notifications: {
    screen: NotificationsNavigator,
    navigationOptions: {
      drawerLabel: 'Notifications',
      drawerIcon: <Ionicons name='notifications'
                            size={25}
                            color={Colors.secondaryColor}/>
    }
  },
  NewProjects: {
    screen: NewProjectsNavigator,
    navigationOptions: {
      drawerLabel: 'Job Pool',
      drawerIcon: <Ionicons name='layers'
                            size={25}
                            color={Colors.secondaryColor}/>
    }
  },
  OngoingProjects: {
    screen: OngoingProjectsNavigator,
    navigationOptions: {
      drawerLabel: 'Ongoing Jobs',
      drawerIcon: <Ionicons name='timer'
                            size={25}
                            color={Colors.secondaryColor}/>
    }
  },
  CompletedProjects: {
    screen: CompletedProjectsNavigator,
    navigationOptions: {
      drawerLabel: 'Completed Jobs',
      drawerIcon: <Ionicons name='checkmark-done'
                            size={25}
                            color={Colors.secondaryColor}/>
    }
  },
  Earnings: {
    screen: EarningsNavigator,
    navigationOptions: {
      drawerLabel: 'My Earnings',
      drawerIcon: <FontAwesome name='dollar'
                               size={25}
                               color={Colors.secondaryColor}/>
    }
  },
  Ideas: {
    screen: IdeasNavigator,
    navigationOptions: {
      drawerLabel: 'My Ideas',
      drawerIcon: <FontAwesome name='comments'
                               size={25}
                               color={Colors.secondaryColor}/>
    }
  },
  SocialMedia: {
    screen: SocialMediaNavigator,
    navigationOptions: {
      drawerLabel: 'My Social Media',
      drawerIcon: <Ionicons name='apps'
                            size={25}
                            color={Colors.secondaryColor}/>
    }
  },
  Profile: {
    screen: ProfileNavigator,
    navigationOptions: {
      drawerLabel: 'My Profile',
      drawerIcon: <Ionicons name='person'
                            size={25}
                            color={Colors.secondaryColor}/>
    }
  }
}, {
  drawerBackgroundColor: Colors.defaultColor,
  contentOptions: {
    activeTintColor: Colors.secondaryColor,
    inactiveTintColor: Colors.tertiaryColor
  }
})

const MainNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  Navigator: InternalNavigator
})

export default createAppContainer(MainNavigator)
