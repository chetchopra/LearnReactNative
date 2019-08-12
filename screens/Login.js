import React, { Component } from 'react';
import { Button, Input, Divider } from 'react-native-elements'

import {
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';



export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      usernamePlaceholder: "Username",
      passwordPlaceholder: "Password"
    }
  }

  navigateToSignUp = () => {
    this.props.navigation.navigate('SignUp')
  }

  navigateToHome = () => {
    this.props.navigation.navigate('Home')
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
      this.navigateToHome();
    }})
  }




  

  render() {
    return (
      <View style={styles.container}>
        <Text>Login Screen!</Text>


        <TextInput
          style={styles.loginInput}
          onChangeText={(username) => this.setState({username})}
          placeholder={this.state.usernamePlaceholder}
          value={this.state.username}
        />



        <TextInput
          style={styles.loginInput}
          onChangeText={(password) => this.setState({password})}
          placeholder={this.state.passwordPlaceholder}
          value={this.state.password}
        />

        <Button title="Login"
                onPress={this.login}
                style={styles.loginButton}
        />

        <Button title="Signup"
                onPress={this.navigateToSignUp}
                style={styles.loginButton}
                />
      </View>
    )
  }


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButton: {
    paddingTop: 20
  },
  loginInput: {
    paddingTop: 10,
    height: 40,
    width: 200,  
    borderColor: 'gray', 
    borderWidth: 1
  }
})





