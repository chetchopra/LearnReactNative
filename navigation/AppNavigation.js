import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';


import { Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import React from 'react'

import Home from '../screens/Home'
import CategoryView from '../screens/CategoryView'
import LearnView from '../screens/LearnView'
import Learn from '../screens/Learn'
import QuestionView from '../screens/QuestionView'
import Question from '../screens/Question'
import WhiteboardView from '../screens/WhiteboardView'
import Whiteboard from '../screens/Whiteboard';



removeToken = async () => {
  try {
    await AsyncStorage.removeItem('token');

  } catch (error) {
    // DO something
  }
};

const appHeader = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#76323F',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: '200',
      fontSize: 25,
    },
    // headerRight: (
    //   <Button
    //     onPress={this.removeToken}
    //     title="Logout"
    //     color="#fff"
    //     style={{ fontWeight: '200', }}
    //   />
    // ),
  }
}


const MainNavigator = createStackNavigator(
  {
    Home: { screen: Home },
    CategoryView: { screen: CategoryView },
    LearnView: { screen: LearnView },
    QuestionView: { screen: QuestionView },
    WhiteboardView: { screen: WhiteboardView },
    Learn: { screen: Learn },
    Question: { screen: Question },
    Whiteboard: { screen: Whiteboard }
  },
  {
    initialRouteName: "Home",
    ...appHeader
  },
);

    

const AppNavigation = createAppContainer(MainNavigator);

export default AppNavigation;