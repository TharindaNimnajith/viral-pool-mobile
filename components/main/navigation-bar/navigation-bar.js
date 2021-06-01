import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons'
import Colors from '../../../shared/const/colors'
import LoginScreen from '../../../screens/auth/login/login-screen'
import ForgotPasswordScreen from '../../../screens/auth/forgot-password/forgot-password-screen'
import DashboardScreen from '../../../screens/dashboard/dashboard-screen'
import NotificationListScreen from '../../../screens/notifications/notification-list/notification-list-screen'
import NotificationProjectDetailsScreen from '../../../screens/notifications/notification-project-details/notification-project-details-screen'
import ProfileScreen from '../../../screens/profile/profile/profile-screen'
import EditProfileScreen from '../../../screens/profile/edit-profile/edit-profile-screen'
import IdeaListScreen from '../../../screens/ideas/idea-list/idea-list-screen'
import AddIdeaScreen from '../../../screens/ideas/add-idea/add-idea-screen'
import EditIdeaScreen from '../../../screens/ideas/edit-idea/edit-idea-screen'
import SocialMediaScreen from '../../../screens/social-media/social-media-screen'
import NewProjectListScreen from '../../../screens/projects/new/new-project-list/new-project-list-screen'
import NewProjectDetailsScreen from '../../../screens/projects/new/new-project-details/new-project-details-screen'
import OngoingProjectListScreen from '../../../screens/projects/ongoing/ongoing-project-list/ongoing-project-list-screen'
import OngoingProjectDetailsScreen from '../../../screens/projects/ongoing/ongoing-project-details/ongoing-project-details-screen'
import CompletedProjectListScreen from '../../../screens/projects/completed/completed-project-list/completed-project-list-screen'
import CompletedProjectDetailsScreen from '../../../screens/projects/completed/completed-project-details/completed-project-details-screen'

const LoginNavigator = createStackNavigator({
  Login: LoginScreen,
  ForgotPassword: ForgotPasswordScreen
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
  Notifications: NotificationListScreen,
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
      drawerIcon: <MaterialCommunityIcons name='bell'
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
