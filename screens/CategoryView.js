import React from 'react';
// import { Button } from 'react-native-elements'

import { Card, ListItem, Button, Icon } from 'react-native-elements'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


export default function CategoryView(props) {
  
  const { navigation } = props

  const navigateToHome = (props, structure) => {
    console.log(structure)
    props.navigation.navigate('CategoryView', {title: structure.s.structure_name})
  }

  const sections = navigation.getParam('sections', 'Default-Title')

  const createCards = () => {
    console.log(sections)
    return sections.map((section) => {
      if (section) {
        if (section.learn_content) {
          return <Card key={section.learn_content}>
                  <Text>Learn</Text>
                  <Button title="Go"
                    // onPress={() => {this.navigateToHome(structure, props)}}
                  />
                </Card>
          return <Text key={section.learn_content}>{section.learn_content}</Text>
        }

        if (section.question_query) {
          return <Text key={section.question_query}>{section.question_query}</Text>
        }

        if (section.whiteboard_name) {
          return <Text key={section.whiteboard_name}>{section.whiteboard_name}</Text>
        }
      }

    })

  } 
  

  
  return (
    <View style={styles.container}>
      {createCards()}
    </View>
  )


};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})





