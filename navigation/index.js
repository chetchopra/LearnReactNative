import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';


import { Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import React from 'react'

// Screen imports 
import Login from '../screens/Login'
import Home from '../screens/Home'
import CategoryView from '../screens/CategoryView'
import Learn from '../screens/Learn'
import SignUp from '../screens/SignUp'
import LearnView from '../screens/LearnView'
import QuestionView from '../screens/QuestionView'
import WhiteboardView from '../screens/WhiteboardView'




removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    // DO something
  }
};


const appHeader = {defaultNavigationOptions : {
  headerStyle: {
    backgroundColor: '#f4511e',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerRight: (
    <Button
      onPress={removeToken}
      title="Logout"
      color="#fff"
    />
  ),
}}





const AuthNavigator = createStackNavigator(
  {
    Login: {screen: Login},
    SignUp: {screen: SignUp},
  },
  { 
    initialRouteName: "Login"
  }
)

const MainNavigator = createStackNavigator(
  {
    Home: {screen: Home},
    CategoryView: {screen: CategoryView},
    LearnView: {screen: LearnView},
    QuestionView: {screen: QuestionView},
    WhiteboardView: {screen: WhiteboardView}
  },
  { 
    initialRouteName: "Home",
    ...appHeader
  },
);


// const Navigation = createAppContainer(MainNavigator);

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