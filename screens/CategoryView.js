import React from 'react';
// import { Button } from 'react-native-elements'

import { Card, ListItem, Button, Icon } from 'react-native-elements'

import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from 'react-native';




export default function CategoryView(props) {
  navigationOptions = {
    title: 'Home',
  };
  
  const { navigation } = props


  const navigateToLearnView = (content) => {
    props.navigation.navigate('LearnView', {learns: content})
  }

  const navigateToQuestionView = (content) => {
    props.navigation.navigate('QuestionView', {questions: content})
  }

  const navigateToWhiteboardView = (content) => {
    props.navigation.navigate('WhiteboardView', {whiteboards: content})
  }

  const sections = navigation.getParam('sections', 'Default-Title')


  const generateCards = () => {
    return Object.keys(sections).map((section) => {
      if (sections[section] && sections[section].length > 0) {
        console.log(sections[section])
        return <Card key={section}>
                  <Text>{section}</Text>
                  {generateCardButton(section, sections[section])}
                </Card>
      }

    })
  } 

  const generateCardButton = (sectionTitle, content) => {
    console.log(content)
    switch(sectionTitle) {
      case "learns":
        return <Button title="Go Learn"
                       onPress={() => {navigateToLearnView(content)}}/>

      case "questions":
        return <Button title="Go Question"
                       onPress={() => {navigateToQuestionView(content)}}/>

      case "whiteboards":
        return <Button title="Go Whiteboard"
                       onPress={() => {navigateToWhiteboardView(content)}}/>

    }
  }
  

  
  return (
    <ScrollView>
      {generateCards()}
    </ScrollView>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})





