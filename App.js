import React, { Component } from 'react';

import AuthNavigation from './navigation/AuthNavigation'
import DrawerNavigation from './navigation/DrawerNavigation'



import { createAppContainer, createSwitchNavigator } from 'react-navigation';



// Screen imports 
import AuthLoadingScreen from './navigation/AuthLoading'


export default class App extends Component {

  render() {

    const Navigation = createAppContainer(createSwitchNavigator(
      {
        AuthLoading: AuthLoadingScreen,
        App: DrawerNavigation,
        Auth: AuthNavigation,
      },
      {
        initialRouteName: "AuthLoading"
      },
      
    ))

    return (
        <Navigation/>
    )
  }
};





