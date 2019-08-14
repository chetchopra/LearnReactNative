import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  TextInput, 
  Image,
} from 'react-native';

import {
  Text,
  Button,
} from 'native-base';




export default class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
    }
  }

  static navigationOptions = {
    title: 'Sign Up',
  };



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


        <Text style={styles.standardText}>Please enter your information and desired credentials below so I can hack all of your other accounts and ruin your life.</Text>
        
        <Image source={{uri: "https://media.giphy.com/media/d2ZhMH5dkQtFo4Mw/giphy.gif"}} style={styles.image}/>

        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.signUpInput}
          onChangeText={(email) => this.setState({email})}
        />

        <Text style={styles.labelText}>Username</Text>
        <TextInput
          style={styles.signUpInput}
          onChangeText={(username) => this.setState({username})}
        />

        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.signUpInput}
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />

        <Text style={styles.labelText}>Confirm Password</Text>
        <TextInput
          style={styles.signUpInput}
          secureTextEntry={true}
          // onChangeText={(password) => this.setState({password})}
        />

        <Button light onPress={this.signUp} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Button>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 300, 
    height: 250, 
    borderRadius: 5,
    borderColor: 'white', 
    borderWidth: 1, 
  },
  container: {
    flex: 1,
    paddingTop: '2%',
    alignItems: 'center',
    backgroundColor: '#565656'
  },
  button: {
    marginTop: 20,
    fontWeight: '200',
    fontSize: 18,
  },
  signUpButton: {
    marginTop: 20,
  },
  buttonText: {
    fontWeight: '200'
  },
  signUpInput: {
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
  },
  standardText: {
    color: 'white',
    fontWeight: '200',
    paddingTop: '2%',
    fontSize: 20,
    marginRight: '2%',
    marginLeft: '2%',
    textAlign: 'center',
    paddingBottom: '5%'
  }
})
