import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button
} from 'react-native';




export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
    }
  }


  navigateToHome = () => {
    this.props.navigation.navigate('Home')
  }

  verifySignUp = (data) => {
    if (data.jwt) {
      console.log(data)
      this.navigateToHome()
    } else {
      console.log(data)
    }
  }

  signUp = () => {
    let url = "http://localhost:3000/users"
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
          user_email: this.state.email
        }
      })
    }
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {this.verifySignUp(json)})

  }

  



  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up Here!</Text>
        <TextInput 
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
          style={styles.signUpInput}/>
        <TextInput 
          placeholder="Enter a username"
          onChangeText={(username) => this.setState({username})}
          style={styles.signUpInput}/>
        <TextInput 
          placeholder="Enter a password"
          onChangeText={(password) => this.setState({password})}
          style={styles.signUpInput}/>
        <Button title="Sign Up"
                onPress={this.signUp}
                style={styles.signUpButton}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  signUpButton: {
    paddingTop: 20
  },
  signUpInput: {
    paddingTop: 10,
    height: 40,
    width: 200,  
    borderColor: 'gray', 
    borderWidth: 1
  }
})