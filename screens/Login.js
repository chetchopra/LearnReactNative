import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage'


import {
  StyleSheet,
  View,
  TextInput, 
  Image
} from 'react-native';

import {
  Text,
  Button,
} from 'native-base';




export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
    }
  }

  static navigationOptions = {
    title: 'Login',
  };

  navigateToSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  navigateToApp = (data) => {
    // console.log(data.userProgress)
    this.props.navigation.navigate('Home', {token: data.jwt, user: data.user, progress: data.userProgress.completion})
  }

  saveToLocalStorage = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      // Error saving data
    }
  }

  login = () => {
    let url = "http://localhost:3000/login"
    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        user: {
          user_name: this.state.username,
          password: this.state.password,
        }
      })
  
    }
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {if (json.jwt) {
      console.log(json)
      this.saveToLocalStorage(json.jwt);
      this.navigateToApp(json);
    } else {
      console.log(json)
    }})
  }

  render() {
    return (
      <View style={styles.view}>
        <Text style={styles.labelText}>Time To Learn...</Text>
        <Image source={require('../assets/gifs/spacegif.gif')}  style={styles.appImage}/>

        
        <Text style={styles.labelText}>Username</Text>
        <TextInput
          style={styles.loginInput}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />


        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.loginInput}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
        />

        <Button light onPress={this.login} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </Button>

        <Button light onPress={this.navigateToSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>
      </View>
    )
  }




};

const styles = StyleSheet.create({
  appImage: {
    width: 300, 
    height: 250, 
    borderRadius: 5,
    borderColor: 'white', 
    borderWidth: 1,
    marginBottom: 25, 
  },
  view: {
    flex: 1,
    paddingTop: '15%',
    alignItems: 'center',
    backgroundColor: '#565656'
  },
  button: {
    marginTop: 20,
  },
  buttonText: {
    fontWeight: '200',
    fontSize: 18,
  },
  loginInput: {
    paddingTop: 10,
    height: 40,
    width: 300,  
    borderColor: 'white', 
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 20,
    color: 'white',
    fontWeight: '300',
    textAlign: 'center',
    paddingBottom: '1%'
  },
  labelText: {
    color: 'white',
    fontWeight: '200',
    paddingTop: '2%',
    fontSize: 18,
  }
})





