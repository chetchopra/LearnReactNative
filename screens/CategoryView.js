import React, { Component } from 'react';
// import { Button } from 'react-native-elements'

import {ListItem, Button, Icon } from 'react-native-elements'

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Card
} from 'native-base';




export default class CategoryView extends Component {
  determineNavigation = (content, sectionTitle) => {
    let { navigation } = this.props
    switch(sectionTitle) {
      case "Learn":
        return navigation.navigate('LearnView', {learns: content})
      case "Questions":
        return navigation.navigate('QuestionView', {questions: content})
      case "Whiteboarding":
        return navigation.navigate('WhiteboardView', {whiteboards: content})
    }
  }

  generateCards = () => {
    let { navigation } = this.props
    let sections = navigation.getParam('sections', 'Default-Title')
    return Object.keys(sections).map((section) => {
      if (sections[section] && sections[section].length > 0) {
        return <TouchableOpacity key={section} onPress={() => {this.determineNavigation(sections[section], section)}}
                  activeOpacity={0.6}
                  style={styles.cardContainer}
                  >
                <Card style={styles.card}>
                  <Text style={styles.cardHeader}>{section}</Text>
                </Card>
               </TouchableOpacity>
      }

    })
  } 

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('screenTitle', 'Structure Screen'),
    };
  };

  render() {
    return (
      <ScrollView style={{backgroundColor: '#565656'}}>
        {this.generateCards()}
      </ScrollView>
    )
}};

const styles = {
  cardContainer: {
    marginLeft: '2%',
    marginRight: '2%'
  },
  card: {
    borderRadius: 5, 
    height: 100, 
    backgroundColor: '#C09F80',
    justifyContent: 'center',
  },
  cardHeader: {
    fontWeight: '300',
    textAlign: 'center', 
    // paddingTop: '2%', 
    fontSize: 25
  }
}






