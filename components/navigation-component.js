import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
// noinspection NpmUsedModulesInstalled
import {Ionicons} from '@expo/vector-icons'
import LoginScreen from '../screens/user/login/login-screen'
import DashboardScreen from '../screens/user/dashboard/dashboard-screen'
import NotificationsScreen from '../screens/user/notifications/notifications-screen'
import ProfileScreen from '../screens/user/profile/profile-screen'
import EditProfileScreen from '../screens/user/profile/edit-profile-screen'
import IdeaListScreen from '../screens/user/ideas/idea-list-screen'
import AddIdeaScreen from '../screens/user/ideas/add-idea-screen'
import EditIdeaScreen from '../screens/user/ideas/edit-idea-screen'
import NewProjectListScreen from '../screens/projects/new/new-project-list-screen'
import NewProjectDetailsScreen from '../screens/projects/new/new-project-details-screen'
import OngoingProjectListScreen from '../screens/projects/ongoing/ongoing-project-list-screen'
import OngoingProjectDetailsScreen from '../screens/projects/ongoing/ongoing-project-details-screen'
import RejectedProjectListScreen from '../screens/projects/rejected/rejected-project-list-screen'
import RejectedProjectDetailsScreen from '../screens/projects/rejected/rejected-project-details-screen'
import CompletedProjectListScreen from '../screens/projects/completed/completed-project-list-screen'
import CompletedProjectDetailsScreen from '../screens/projects/completed/completed-project-details-screen'
import TestNotificationScreen from '../screens/dev/test-notification-screen'
import TestDevScreen from '../screens/dev/test-dev-screen'
import Colors from '../shared/colors'

const LoginNavigator = createStackNavigator(
  {
    Login: LoginScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const DashboardNavigator = createStackNavigator(
  {
    Dashboard: DashboardScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const NotificationsNavigator = createStackNavigator(
  {
    Notifications: NotificationsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen,
    EditProfile: EditProfileScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const AddIdeaNavigator = createStackNavigator(
  {
    AddIdea: AddIdeaScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const IdeasNavigator = createStackNavigator(
  {
    IdeaList: IdeaListScreen,
    EditIdea: EditIdeaScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const NewProjectsNavigator = createStackNavigator(
  {
    NewProjectList: NewProjectListScreen,
    NewProjectDetails: NewProjectDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const OngoingProjectsNavigator = createStackNavigator(
  {
    OngoingProjectList: OngoingProjectListScreen,
    OngoingProjectDetails: OngoingProjectDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const RejectedProjectsNavigator = createStackNavigator(
  {
    RejectedProjectList: RejectedProjectListScreen,
    RejectedProjectDetails: RejectedProjectDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const CompletedProjectsNavigator = createStackNavigator(
  {
    CompletedProjectList: CompletedProjectListScreen,
    CompletedProjectDetails: CompletedProjectDetailsScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const TestNotificationNavigator = createStackNavigator(
  {
    TestNotification: TestNotificationScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const TestDevNavigator = createStackNavigator(
  {
    TestDev: TestDevScreen
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const InternalNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardNavigator,
      navigationOptions: {
        drawerLabel: 'DASHBOARD',
        drawerIcon: <Ionicons name='speedometer'
                              size={25}/>
      }
    },
    Notifications: {
      screen: NotificationsNavigator,
      navigationOptions: {
        drawerLabel: 'NOTIFICATIONS',
        drawerIcon: <Ionicons name='notifications'
                              size={25}/>
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        drawerLabel: 'MY PROFILE',
        drawerIcon: <Ionicons name='person'
                              size={25}/>
      }
    },
    AddIdea: {
      screen: AddIdeaNavigator,
      navigationOptions: {
        drawerLabel: 'NEW IDEA',
        drawerIcon: <Ionicons name='add'
                              size={25}/>
      }
    },
    Ideas: {
      screen: IdeasNavigator,
      navigationOptions: {
        drawerLabel: 'MY IDEAS',
        drawerIcon: <Ionicons name='bulb'
                              size={25}/>
      }
    },
    NewProjects: {
      screen: NewProjectsNavigator,
      navigationOptions: {
        drawerLabel: 'NEW PROJECTS',
        drawerIcon: <Ionicons name='layers'
                              size={25}/>
      }
    },
    OngoingProjects: {
      screen: OngoingProjectsNavigator,
      navigationOptions: {
        drawerLabel: 'ONGOING PROJECTS',
        drawerIcon: <Ionicons name='flash'
                              size={25}/>
      }
    },
    RejectedProjects: {
      screen: RejectedProjectsNavigator,
      navigationOptions: {
        drawerLabel: 'REJECTED PROJECTS',
        drawerIcon: <Ionicons name='warning'
                              size={25}/>
      }
    },
    CompletedProjects: {
      screen: CompletedProjectsNavigator,
      navigationOptions: {
        drawerLabel: 'COMPLETED PROJECTS',
        drawerIcon: <Ionicons name='checkmark-done'
                              size={25}/>
      }
    },
    TestNotification: {
      screen: TestNotificationNavigator,
      navigationOptions: {
        drawerLabel: 'TEST NOTIFICATIONS',
        drawerIcon: <Ionicons name='bug'
                              size={25}/>
      }
    },
    TestDev: {
      screen: TestDevNavigator,
      navigationOptions: {
        drawerLabel: 'TEST DEV',
        drawerIcon: <Ionicons name='bug'
                              size={25}/>
      }
    }
  },
  {
    drawerBackgroundColor: Colors.tertiaryColor,
    contentOptions: {
      activeTintColor: Colors.secondaryColor
    }
  }
)

const MainNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  Navigator: InternalNavigator
})

export default createAppContainer(MainNavigator)
