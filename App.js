import React, { Component } from 'react';
// import Navigation from './navigation/index';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';


import { Button } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// import React from 'react'

// Screen imports 
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Home from './screens/Home'
import CategoryView from './screens/CategoryView'
import LearnView from './screens/LearnView'
import QuestionView from './screens/QuestionView'
import WhiteboardView from './screens/WhiteboardView'
import Learn from './screens/Learn'
import Question from './screens/Question'
import Whiteboard from './screens/Whiteboard';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      structures: [],
      isLoggedIn: false,
    }
  }

  checkLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        // this.navigateToApp();
        // return true;
        this.setState({isLoggedIn: true})
      }
    } catch (error) {
        // console.log("token not found")
        // return false;
        // return "Auth"
        this.setState({isLoggedIn: false})
    }
  }

  removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      this.setState({isLoggedIn: false})
    } catch (error) {
      // DO something
    }
  };

  componentDidMount() {
    this.checkLocalStorage()
  }

  render() {
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
        headerRight: (
          <Button
            onPress={this.removeToken}
            title="Logout"
            color="#fff"
            style={{ fontWeight: '200', }}
          />
        ),
      }
    }
    
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
    
    
    const AuthNavigator = createStackNavigator(
      {
        Login: { screen: Login },
        SignUp: { screen: SignUp },
      },
      {
        initialRouteName: "Login",
        ...authHeader
      }
    )
    
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
    
    const Navigation = this.state.isLoggedIn ? createAppContainer(createSwitchNavigator(
      {
        App: MainNavigator,
        Auth: AuthNavigator
      },
      {
        initialRouteName: "App"
      }
    )) 
    :
    createAppContainer(createSwitchNavigator(
      {
        App: MainNavigator,
        Auth: AuthNavigator
      },
      {
        initialRouteName: "Auth"
      }
    ))

    // const Navigation = createAppContainer(AuthNavigator)


    return (
      
        <Navigation/>
    )
  }
};





