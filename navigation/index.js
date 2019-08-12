import { createStackNavigator, createAppContainer } from 'react-navigation';

import React from 'react'

// Screen imports 
import Login from '../screens/Login'
import Home from '../screens/Home'
import CategoryView from '../screens/CategoryView'
import Learn from '../screens/Learn'
import SignUp from '../screens/SignUp'




const MainNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    SignUp: {screen: SignUp},
    Home: {screen: Home},
    CategoryView: {screen: CategoryView},
    Learn: {screen: Learn}

  },
  { 
    initialRouteName: "Login"
  },
);


const Navigation = createAppContainer(MainNavigator);


export default Navigation;