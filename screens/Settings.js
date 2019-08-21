import React, { Component } from 'react'

import { 
   
  View,
  StyleSheet,
  TextInput
} from 'react-native'

import {
  Text,
  Button,
} from 'native-base';

import AsyncStorage from '@react-native-community/async-storage'



export default class Settings extends Component {
  constructor() {
    super();
    this.state = {
      oldUsername: "",
      username: "",
      email: "", 
      password: "",
      userToken: null,
    }
  }

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('token');

    if (userToken) {
      this.setState({userToken: userToken})
      this.fetchUserInfo()
    } else {
      // DO SOMETHING
    }
  };

  componentDidMount() {
    this._bootstrapAsync();
        
  }

  fetchUserInfo = () => {
    // console.log(this.state.userToken)
    let url = "http://localhost:3000/profile"
    let configObj = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.userToken}`
      }
    }
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {console.log(json);this.setState({username: json.user.user_name, 
                                                    oldUsername: json.user.user_name,
                                                    email: json.user.user_email})})
  }

  handleUpdate = (data) => {
    console.log(data)
    if (data.user) {
      this.setState({username: data.user.user_name, 
                     oldUsername: data.user.user_name,
                     email: data.user.user_email})
      alert(`Information successfully updated to username: ${data.user.user_name} email: ${data.user.user_email}`)
    } else {
      alert("Update unsuccessful!")
    }
  }

  updateUserInfo = () => {
    this.clearPassword()
    let url = "http://localhost:3000/profile"
    let configObj = {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          user: {
            user_name: this.state.oldUsername,
            new_user_name: this.state.username,
            user_email: this.state.email,
            password: this.state.password
          }
        }
      )
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {this.handleUpdate(json)})
  }

  clearPassword = () => {
    this.setState({password: ""})
  }


  removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
    } catch (error) {
      // DO something
    }
  };

  performLogout = () => {
    this.removeToken();
    this.props.navigation.navigate('Auth');
  }

  render() {

    return (
      <View style={styles.view}>

        <Text style={styles.standardText}>Please enter your new information and desired credentials.</Text>

        <Text style={styles.labelText}>Email</Text>
        <TextInput
          style={styles.Input}
          onChangeText={(email) => this.setState({email})}
          value={this.state.email}
        />

        <Text style={styles.labelText}>Username</Text>
        <TextInput
          style={styles.Input}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />

        <Text style={styles.labelText}>Password</Text>
        <TextInput
          style={styles.Input}
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
          secureTextEntry={true}
        />

        <Button light onPress={this.updateUserInfo} style={styles.button}>
          <Text style={styles.buttonText}>Update</Text>
        </Button>

        <Button light onPress={this.performLogout} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Button>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  // appImage: {
  //   width: 300, 
  //   height: 250, 
  //   borderRadius: 5,
  //   borderColor: 'white', 
  //   borderWidth: 1,
  //   marginBottom: 25, 
  // },
  view: {
    flex: 1,
    paddingTop: '30%',
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
  logoutButton: {
    marginTop: 150,
  },
  logoutButtonText: {
    fontWeight: '200',
    fontSize: 18,
    color: 'red'
  },
  Input: {
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

