import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {Ionicons} from '@expo/vector-icons'

const HomeNavigator = createStackNavigator(
  {
    Categories: {
      screen: HomeScreen
    },
    CategoriesProducts: {
      screen: CategoriesProductsScreen
    },
    ProductDetails: {
      screen: ProductsDetailScreen
    }
  },
  {
    defaultNavigationOptions: {
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

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
    OrderDetails: OrderDetailsScreen
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

const FeedbackNavigator = createStackNavigator(
  {
    Feedback: FeedbackScreen
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

const CartNavigator = createStackNavigator(
  {
    Cart: {
      screen: CartScreen
    },
    DeliveryDetails: {
      screen: DeliveryDetailsScreen
    },
    PaymentDetails: {
      screen: PaymentScreen
    },
    PaymentDetails2: {
      screen: PaymentCardScreen
    },

  },

  {
    defaultNavigationOptions: {

      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

const WishListNavigator = createStackNavigator(
  {
    WishList: {
      screen: WishListScreen
    },
    ProductDetails: {
      screen: ProductsDetailScreen
    }

  },

  {
    defaultNavigationOptions: {

      headerStyle: {
        backgroundColor: Colors.primaryColor
      },
      headerTintColor: Colors.secondaryColor
    }
  }
)

// const PaymentNavigator = createStackNavigator(
//   {
//     Cart: PaymentScreen
//   },
//   {
//     defaultNavigationOptions: {
//       headerTitleAlign: 'center',
//       headerStyle: {
//         backgroundColor: Colors.primaryColor
//       },
//       headerTintColor: Colors.secondaryColor
//     }
//   }
// )
//
// const PaymentCardNavigator = createStackNavigator(
//   {
//     Cart: PaymentCardScreen
//   },
//   {
//     defaultNavigationOptions: {
//       headerTitleAlign: 'center',
//       headerStyle: {
//         backgroundColor: Colors.primaryColor
//       },
//       headerTintColor: Colors.secondaryColor
//     }
//   }
// )

const ShopNavigator = createDrawerNavigator(
  {
    Home: {
      screen: HomeNavigator,
      navigationOptions: {
        drawerLabel: 'Home',
        drawerIcon: <Ionicons name='ios-home'
                              size={25}/>
      }
    },
    Profile: {
      screen: ProfileNavigator,
      navigationOptions: {
        drawerLabel: 'My Profile',
        drawerIcon: <Ionicons name='md-person'
                              size={25}/>
      }
    },
    Orders: {
      screen: OrdersNavigator,
      navigationOptions: {
        drawerLabel: 'My Orders',
        drawerIcon: <Ionicons name='md-albums'
                              size={25}/>
      }
    },
    Feedback: {
      screen: FeedbackNavigator,
      navigationOptions: {
        drawerLabel: 'Feedback',
        drawerIcon: <Ionicons name='md-paper-plane'
                              size={25}/>
      }
    },
    Cart: {
      screen: CartNavigator,
      navigationOptions: {
        drawerLabel: 'Cart',
        drawerIcon: <Ionicons name='md-cart'
                              size={25}/>
      }
    },
    WishList: {
      screen: WishListNavigator,
      navigationOptions: {
        drawerLabel: 'WishList',
        drawerIcon: <Ionicons name='md-heart'
                              size={25}/>
      }
    },
    // Payment: {
    //   screen: PaymentNavigator,
    //   navigationOptions: {
    //     drawerLabel: 'Payment Details',
    //     drawerIcon: <Ionicons name='md-albums'
    //                           size={25}/>
    //   }
    // },
    // PaymentCard: {
    //   screen: PaymentCardNavigator,
    //   navigationOptions: {
    //     drawerLabel: 'Payment Details Card',
    //     drawerIcon: <Ionicons name='md-albums'
    //                           size={25}/>
    //   }
    // },
    Logout: {
      screen: FeedbackNavigator,
      navigationOptions: {
        drawerLabel: 'Logout',
        drawerIcon: <Ionicons name='md-arrow-round-forward'
                              size={25}/>
      }
    }
  },
  {
    drawerBackgroundColor: Colors.secondaryColor,
    contentOptions: {
      activeTintColor: Colors.primaryColor
    }
  }
)

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
    ForgotPassword: ForgotPasswordScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  }
)

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator
})

export default createAppContainer(MainNavigator)
