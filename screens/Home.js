import React, { Component } from 'react';

import AsyncStorage from '@react-native-community/async-storage'

import {
  ScrollView,
  Text,
  Image,
  TouchableOpacity, 
  // Button 
} from 'react-native';

import { 
  Card,
  Button, 
  Icon
} from 'native-base';



export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {
      structures: [],
      userToken: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
    title: 'Structures',
    headerRight: (
      <Button transparent onPress={navigation.openDrawer}>
        <Icon style={{color: 'black'}} name='cog'/>
      </Button>
    ),
  }};

  getToken = () => {
    
    AsyncStorage.getItem("token")
    .then(resp => {
      this.setState({userToken: resp});
      this.fetchStructures();
    })
  }
  

  navigateToCategoryView = (structure) => {
    console.log(structure)
    this.props.navigation.navigate('CategoryView', 
      {
        screenTitle: structure.structure_name
      })
  }

  saveCurrentStucture = async (structure) => {
    try {
      await AsyncStorage.setItem('currentStructure', structure.structure_id);
      this.navigateToCategoryView(structure);
    } catch (error) {
      // Error saving data
    }
  }
  

  generateDataStructureCards = () => {  
    return this.state.structures.map((structure, idx) => {
      console.log(structure)
      return (
        <TouchableOpacity key={idx} onPress={() => {this.saveCurrentStucture(structure)}}
          activeOpacity={0.6}
          style={styles.cardContainer}>

        <Card style={styles.card}>
          <Text style={styles.cardHeader}>{structure.structure_name}</Text>
          <Text style={styles.cardText}>{structure.structure_description}</Text>
          <Image source={{uri: structure.structure_image}} 
          style={{height: 30, width: 30, marginLeft: 'auto', marginRight: 'auto', marginTop: '2%'}}/>
          <Text>{this.calculateCompleted(structure)}</Text>
        </Card>
        </TouchableOpacity>
      ) 
    })
  }

  calculateCompleted = (structure) => {
    // console.log(structure)
    return `Learn: ${structure.completion["Learn"].completed} / ${structure.completion["Learn"].total} | Questions: ${structure.completion["Questions"].completed} / ${structure.completion["Questions"].total} | Whiteboarding: ${structure.completion["Whiteboarding"].completed} / ${structure.completion["Whiteboarding"].total}`

    // console.log(this.state.userCompletion)
    // if (this.state.userCompletion) {
    //   let completedLearns = this.state.userCompletion[`${structure.structure.structure_name}`].learns.completed.length;
    //   let totalLearns = this.state.userCompletion[`${structure.structure.structure_name}`].learns.total;
    //   let completedQuestions = this.state.userCompletion[`${structure.structure.structure_name}`].questions.completed.length;
    //   let totalQuestions = this.state.userCompletion[`${structure.structure.structure_name}`].questions.total
    //   let completedWhiteboards = this.state.userCompletion[`${structure.structure.structure_name}`].whiteboards.completed.length;
    //   let totalWhiteboards = this.state.userCompletion[`${structure.structure.structure_name}`].whiteboards.total
    //   return `Learns: ${completedLearns} out of ${totalLearns} | Questions: ${completedQuestions} out of ${totalQuestions} | Whiteboards: ${completedWhiteboards} out of ${totalWhiteboards}`
    //   // return (this.state.userCompletion[`${structure.structure_name}`].learns.completed.length) / (this.state.userCompletion[`${structure.structure_name}`].learns.total)
    // }
    // return "not here yet"
  }

  componentDidMount() {
    this.getToken();
    // this.fetchStructures();
  }

  // fetchStructures = () => {
  //   let url = "http://localhost:3000/structures"
  //   fetch(url)
  //   .then(resp => resp.json())
  //   .then(json => {
  //     this.setState({structures: json})
  //     console.log(json)
  //   })
  // }

  fetchStructures = () => {
    let url = "http://localhost:3000/structures"
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
      this.setState({structures: json})
      console.log(json)
    })
  }

  render() {
    return (
      
      <ScrollView style={{backgroundColor: '#565656'}}>
        {this.generateDataStructureCards(this.props)}   
      </ScrollView>
    )
  }
};

const styles = {
  cardContainer: {
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 5,
    height: '18%',
    marginBottom: '2%' 
  },
  card: {
    height: '100%', 
    backgroundColor: '#C09F80',
    borderColor: '#76323F', 
    borderWidth: 1,
    borderRadius: 5,
  },
  cardHeader: {
    fontWeight: '300',
    textAlign: 'center', 
    paddingTop: '2%', 
    fontSize: 28
  },
  cardText: {
    fontWeight: '200',
    fontSize: 14,
    textAlign: 'center', 
  }
}


