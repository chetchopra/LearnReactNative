import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react'
import SignUp from '../screens/SignUp'
import Login from '../screens/Login'



const authHeader = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#76323F',
    },
    headerTintColor: '#000',
    headerTitleStyle: {
      fontWeight: '200',
      fontSize: 25,
    },
  }
}


const AuthNavigation = createStackNavigator(
  {
    Login: { screen: Login },
    SignUp: { screen: SignUp },
  },
  {
    initialRouteName: "Login",
    ...authHeader
  }
)

export default AuthNavigation;