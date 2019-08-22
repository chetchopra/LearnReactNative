import React, { Component } from 'react';

import CardFlip from 'react-native-card-flip';

import { 
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image
 } from 'react-native'

 import AsyncStorage from '@react-native-community/async-storage'




export default class Whiteboard extends Component{
  constructor(props) {
    super()
    this.state = {
      whiteboard_question: null,
      whiteboard_image: null,
      whiteboard_solution: null,
      isComplete: null,
      userToken: null,
    }
  }

  getToken = () => {
    AsyncStorage.getItem("token")
    .then(resp => {
      this.setState({userToken: resp});
      this.fetchWhiteboardContent();
    })
  }

  fetchWhiteboardContent = () => {
    let whiteboardId = this.props.navigation.getParam('whiteboard_id')
    let url = `http://localhost:3000/whiteboards/${whiteboardId}`
    let configObj = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.userToken}`
      }
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      this.setState({
        whiteboard_question: json.whiteboard_question,
        whiteboard_image: json.whiteboard_image,
        whiteboard_solution: json.whiteboard_solution,
        isComplete: json.isComplete,
      })
    })
  }

  componentDidMount() {
    this.getToken();
  }

  render() {
    return (
      <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >

        <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >

          <Text style={styles.question}>{this.state.whiteboard_question}</Text>

          <Image
          style={styles.image}
          source={{uri: `${this.state.whiteboard_image}`}}
          />

        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >

          <Text style={styles.answer}>{this.state.whiteboard_solution}</Text>

        </TouchableOpacity>

      </CardFlip>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    height: '100%',
    width: '100%',
    marginLeft: 'auto',
    backgroundColor: '#565656',
  },
  card: {
    height: '90%',
    width: '90%',
    backgroundColor: '#C09F80',
    borderColor: '#76323F', 
    borderWidth: 1,
    borderRadius: 5,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 'auto',
    marginBottom: 'auto',
    // margin: 'auto',
  },
  question: {
    textAlign: 'center',
    fontSize: 22, 
    fontWeight: '300',
    marginTop: '10%'
  },
  answer: {
    textAlign: 'center',
    fontSize: 22, 
    fontWeight: '300',
    marginTop: '10%'
  },
  image: {
    height: 300, 
    width: 300,
    marginLeft: 'auto',
    marginRight: 'auto',
  }


})
