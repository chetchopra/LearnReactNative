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

import AsyncStorage from '@react-native-community/async-storage'





export default class CategoryView extends Component {
  constructor(props) {
    super()
    this.state = {
      // completedLearns: props.navigation.getParam('structureCompletion').learns,
      // completedQuestions: props.navigation.getParam('structureCompletion').questions,
      // completedWhiteboards: props.navigation.getParam('structureCompletion').whiteboards,
      userToken: null,
      sections: {},
      currentStructureId: null,
    }
  }

  getTokenAndStructure = () => {
    AsyncStorage.multiGet(["token", "currentStructure"])
    .then(resp => {
      this.setState({userToken: resp[0][1], currentStructureId: resp[1][1]});
      this.fetchSectionDetails();
    })
  }

  componentDidMount() {
    this.getTokenAndStructure();
    // this.getCurrentStucture();
  }

  // getCurrentStucture = async () => {
  //   const currentStructure = await AsyncStorage.getItem('currentStructure');

  //   if (currentStructure) {
  //     console.log(currentStructure)
  //   } else {
  //     // this.props.navigation.navigate('Auth')
  //   }
  // }

  fetchSectionDetails = () => {
    let url = `http://localhost:3000/sectiondetails/${this.state.currentStructureId}`
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
      this.setState({sections: json})
      console.log(json)
    })
  }


  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('screenTitle', 'Structure Screen'),
      headerRight: (
        <Button transparent onPress={navigation.openDrawer}>
          <Icon style={{color: 'black'}} name='cog'/>
        </Button>
    ),
  }};

  determineNavigation = (sectionTitle) => {
    switch(sectionTitle) {
      case "Learn":
        return this.props.navigation.navigate('LearnView', {increaseCompletedLearns: this.increaseCompletedLearns,
                                                            decreaseCompletedLearns: this.decreaseCompletedLearns,})
      case "Questions":
        return this.props.navigation.navigate('QuestionView', {increaseCompletedQuestions: this.increaseCompletedQuestions})
      case "Whiteboarding":
        return this.props.navigation.navigate('WhiteboardView', {increaseCompletedWhiteboards: this.increaseCompletedWhiteboards,
                                                                 decreaseCompletedWhiteboards: this.decreaseCompletedWhiteboards,})
    }
  }

  determineSectionProgress = (sectionTitle) => {
    return `${this.state.sections[`${sectionTitle}`].completed} / ${this.state.sections[`${sectionTitle}`].total}`
    // switch(sectionTitle) {
    //   case "Learn":
    //     return `${this.state.sections["Learn"].completed} / ${this.state.sections["Learn"].total}`
    //   case "Questions":
    //     return `${this.state.sections["Questions"].completed} / ${this.state.sections["Questions"].total}`
    //   case "Whiteboarding":
    //     return `${this.state.sections["Whiteboarding"].completed} / ${this.state.sections["Whiteboarding"].total}`
    // }
  }

  increaseCompletedLearns = () => {
    let newSections = this.state.sections
    newSections["Learn"].completed++
    this.setState({sections: newSections})

    this.props.navigation.getParam('increaseCompletedLearns')(this.state.currentStructureId)
  }

  decreaseCompletedLearns = () => {
    let newSections = this.state.sections
    newSections["Learn"].completed--
    this.setState({sections: newSections})

    this.props.navigation.getParam('decreaseCompletedLearns')(this.state.currentStructureId)
  }

  increaseCompletedWhiteboards = () => {
    let newSections = this.state.sections
    newSections["Whiteboarding"].completed++
    this.setState({sections: newSections})

    this.props.navigation.getParam('increaseCompletedWhiteboards')(this.state.currentStructureId)
  }

  decreaseCompletedWhiteboards = () => {
    let newSections = this.state.sections
    newSections["Whiteboarding"].completed--
    this.setState({sections: newSections})

    this.props.navigation.getParam('decreaseCompletedWhiteboards')(this.state.currentStructureId)
  }

  increaseCompletedQuestions = () => {
    let newSections = this.state.sections
    newSections["Questions"].completed++
    this.setState({sections: newSections})

    this.props.navigation.getParam('increaseCompletedQuestions')(this.state.currentStructureId)
  }




  generateCards = () => {
    let sections = this.state.sections
    return Object.keys(sections).map((section) => {
      if (sections[section] && (sections[section].total > 0)) {
        return <TouchableOpacity key={section} onPress={() => {this.determineNavigation(section)}}
                  activeOpacity={0.6}
                  style={styles.cardContainer}
                  >
                <Card style={styles.card}>
                  <Text style={styles.cardHeader}>{section}</Text>
                  <Image source={{uri: "http://icons.iconarchive.com/icons/graphicloads/colorful-long-shadow/128/Bulb-icon.png"}} 
                  style={{margin: 'auto', height: 30, width: 30, marginLeft: 'auto', marginRight: 'auto', marginTop: 10}}/>

                  <Text style={styles.completionText}>{this.determineSectionProgress(section)}</Text>

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
    marginRight: '2%',
    marginBottom: '2%', 
  },
  card: {
    borderRadius: 5, 
    height: 100, 
    backgroundColor: '#C09F80',
    justifyContent: 'center',
    borderColor: '#76323F',
  },
  cardHeader: {
    fontWeight: '300',
    textAlign: 'center', 
    // paddingTop: '2%', 
    fontSize: 25
  },
  completionText: {
    marginTop: '2%',
    fontWeight: '200',
    textAlign: 'center',
  },
}






