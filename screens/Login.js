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

  navigateToApp = () => {
    this.props.navigation.navigate('App')
  }

  saveToLocalStorage = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
    } catch (error) {
      // Error saving data
    }
  }

  checkLocalStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        this.navigateToApp();
        return true;
      }
    } catch (error) {
      console.log("token not found")
        return false;
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
      this.saveToLocalStorage(json.jwt);
      this.navigateToApp();
    }})
  }

  componentDidMount() {
    this.checkLocalStorage()
  }


  render() {
    return (
      <View style={styles.container}>
        <Image source={{uri: 'https://media.giphy.com/media/BHNfhgU63qrks/giphy.gif'}} style={styles.appImage}/>
        
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
  container: {
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





