import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';
import React from 'react'
import SignUp from '../screens/SignUp'
import Login from '../screens/Login'



const AuthNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    SignUp: {screen: SignUp},
  },
  { 
    initialRouteName: "Login"
  }
)

const AuthNavigation = createAppContainer(AuthNavigator);

export default AuthNavigation;