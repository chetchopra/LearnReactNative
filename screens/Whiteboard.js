import React, { Component } from 'react';

import CardFlip from 'react-native-card-flip';

import { 
  Text,
  TouchableOpacity,
  StyleSheet,
 } from 'react-native'




export default class Whiteboard extends Component{
  render() {
    return (
      <CardFlip style={styles.cardContainer} ref={(card) => this.card = card} >
        <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>QUESTION</Text></TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} ><Text>ANSWER</Text></TouchableOpacity>
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
  }


})
