import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {Ionicons} from '@expo/vector-icons'
import DashboardScreen from '../screens/user/dashboard-screen'
import ProfileScreen from '../screens/user/profile-screen'
import IdeaListScreen from '../screens/ideas/idea-list-screen'
import AddIdeaScreen from '../screens/ideas/add-idea-screen'
import EditIdeaScreen from '../screens/ideas/edit-idea-screen'
import NewProjectListScreen from '../screens/projects/new/new-project-list-screen'
import NewProjectDetailsScreen from '../screens/projects/new/new-project-details-screen'
import OngoingProjectListScreen from '../screens/projects/ongoing/ongoing-project-list-screen'
import OngoingProjectDetailsScreen from '../screens/projects/ongoing/ongoing-project-details-screen'
import RejectedProjectListScreen from '../screens/projects/rejected/rejected-project-list-screen'
import RejectedProjectDetailsScreen from '../screens/projects/rejected/rejected-project-details-screen'
import CompletedProjectListScreen from '../screens/projects/completed/completed-project-list-screen'
import CompletedProjectDetailsScreen from '../screens/projects/completed/completed-project-details-screen'
import LoginScreen from '../screens/user/login-screen'
import Colors from './colors'

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

const ProfileNavigator = createStackNavigator(
  {
    Profile: ProfileScreen
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

const InternalNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardNavigator,
      navigationOptions: {
        drawerLabel: 'DASHBOARD',
        drawerIcon: <Ionicons name='md-home'
                              size={25}/>
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        drawerLabel: 'MY PROFILE',
        drawerIcon: <Ionicons name='sc-telegram'
                              size={25}/>
      }
    },
    AddIdea: {
      screen: AddIdeaNavigator,
      navigationOptions: {
        drawerLabel: 'NEW IDEA',
        drawerIcon: <Ionicons name='sc-telegram'
                              size={25}/>
      }
    },
    Ideas: {
      screen: IdeasNavigator,
      navigationOptions: {
        drawerLabel: 'MY IDEAS',
        drawerIcon: <Ionicons name='sc-telegram'
                              size={25}/>
      }
    },
    NewProjects: {
      screen: NewProjectsNavigator,
      navigationOptions: {
        drawerLabel: 'NEW PROJECTS',
        drawerIcon: <Ionicons name='sc-telegram'
                              size={25}/>
      }
    },
    OngoingProjects: {
      screen: OngoingProjectsNavigator,
      navigationOptions: {
        drawerLabel: 'ONGOING PROJECTS',
        drawerIcon: <Ionicons name='sc-telegram'
                              size={25}/>
      }
    },
    RejectedProjects: {
      screen: RejectedProjectsNavigator,
      navigationOptions: {
        drawerLabel: 'REJECTED PROJECTS',
        drawerIcon: <Ionicons name='sc-telegram'
                              size={25}/>
      }
    },
    CompletedProjects: {
      screen: CompletedProjectsNavigator,
      navigationOptions: {
        drawerLabel: 'COMPLETED PROJECTS',
        drawerIcon: <Ionicons name='sc-telegram'
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

const MainNavigator = createSwitchNavigator({
  Login: LoginNavigator,
  Navigator: InternalNavigator
})

export default createAppContainer(MainNavigator)
