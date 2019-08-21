import React, { Component } from 'react';

import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Card,
  Button,
  Icon
} from 'native-base';




export default class CategoryView extends Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('screenTitle', 'Structure Screen'),
      headerRight: (
        <Button transparent onPress={navigation.openDrawer}>
          <Icon style={{color: 'black'}} name='cog'/>
        </Button>
    ),
  }};

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
                  <Image source={{uri: "http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/128/Bulb-icon.png"}} 
                  style={{margin: 'auto', height: 30, width: 30, marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}/>
                </Card>
               </TouchableOpacity>
      }

    })
  } 

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






