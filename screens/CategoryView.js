import React, { Component } from 'react';
// import { Button } from 'react-native-elements'

import { Card, ListItem, Button, Icon } from 'react-native-elements'

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';




export default function CategoryView (props) {

  const { navigation } = props



  const determineNavigation = (content, sectionTitle) => {
    switch(sectionTitle) {
      case "learns":
        return navigation.navigate('LearnView', {learns: content})
      case "questions":
        return navigation.navigate('QuestionView', {questions: content})
      case "whiteboards":
        return navigation.navigate('WhiteboardView', {whiteboards: content})
    }
  }

  const generateCards = () => {
    let sections = navigation.getParam('sections', 'Default-Title')
    return Object.keys(sections).map((section) => {
      if (sections[section] && sections[section].length > 0) {
        return <TouchableOpacity key={section} onPress={() => {determineNavigation(sections[section], section)}}>
                <Card>
                  <Text>{section}</Text>
                </Card>
               </TouchableOpacity>
      }

    })
  } 

  navigationOptions = () => {
    return {
      title: 'fdsahfkk',
    };
  };

  return (
    <ScrollView>
      {generateCards()}
    </ScrollView>
  )
};






