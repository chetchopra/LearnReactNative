import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';


import { Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import React from 'react'

// Screen imports 
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import Home from '../screens/Home'
import CategoryView from '../screens/CategoryView'
import LearnView from '../screens/LearnView'
import QuestionView from '../screens/QuestionView'
import WhiteboardView from '../screens/WhiteboardView'
import Learn from '../screens/Learn'
import Question from '../screens/Question'
import Whiteboard from '../screens/Whiteboard';





removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');

  } catch (error) {
    // DO something
  }
};


const appHeader = {defaultNavigationOptions : {
  headerStyle: {
    backgroundColor: '#76323F',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: '200',
    fontSize: 25,
  },
  headerRight: (
    <Button
      onPress={removeToken}
      title="Logout"
      color="#fff"
      style={{fontWeight: '200',}}
    />
  ),
}}

const authHeader = {defaultNavigationOptions : {
  headerStyle: {
    backgroundColor: '#76323F',
  },
  headerTintColor: '#000',
  headerTitleStyle: {
    fontWeight: '200',
    fontSize: 25,
  },
}}


const AuthNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    SignUp: {screen: SignUp},
  },
  { 
    initialRouteName: "Login",
    ...authHeader
  }
)

const MainNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    CategoryView: {screen: CategoryView},
    LearnView: {screen: LearnView},
    QuestionView: {screen: QuestionView},
    WhiteboardView: {screen: WhiteboardView},
    Learn: {screen: Learn},
    Question: {screen: Question},
    Whiteboard: {screen: Whiteboard}
  },
  { 
    initialRouteName: "Home",
    ...appHeader
  },
);

const Navigation = createAppContainer(createSwitchNavigator(
  {
    App: MainNavigator,
    Auth: AuthNavigator
  },
  {
    initialRouteName: "Auth"
  }
))

export default Navigation;