import React, { Fragment, Component } from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Navigation from './navigation/index'
import { Card, ListItem, Icon, Header } from 'react-native-elements'

import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';

import Login from './screens/Login'




// Exported functional component
export default class App extends Component {
  constructor() {
    super();
    this.state = {
      structures: []
    }

  }

  componentDidMount() {
    let url = "http://localhost:3000/structures"
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({structures: json}))
  }

  render() {
    return (
        <Navigation structures={this.state.structures}/>
    )
    // return <Login/>
  }


};


// General styling 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
 
});


