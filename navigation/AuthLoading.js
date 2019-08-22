import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage'


export default class AuthLoadingScreen extends Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    if (userToken) {
      // this.fetchUser(userToken)
      this.props.navigation.navigate('Home')
    } else {
      this.props.navigation.navigate('Auth')
    }
  };

  fetchUser = (token) => {
    let url = "http://localhost:3000/profile"
    let configObj = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {this.props.navigation.navigate('Home', {token: token, user: json.user, progress: json.userProgress.completion})})
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.view}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
    backgroundColor: '#565656'
  },
});