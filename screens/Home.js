import React, { Component } from 'react';

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
      usertoken: props.navigation.getParam('token'),
      userInfo: null,
      userCompletion: props.navigation.getParam('progress'),
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
  

  navigateToCategoryView = (structure) => {
    this.props.navigation.navigate('CategoryView', 
      {
        sections: {
          Learn: structure.learns,
          Questions: structure.questions,
          Whiteboarding: structure.whiteboards
        },
      screenTitle: structure.structure.structure_name
      })
  }

  generateDataStructureCards = () => {  
    return this.state.structures.map((structure, idx) => {
      return (
        <TouchableOpacity key={idx} onPress={() => {this.navigateToCategoryView(structure)}}
          activeOpacity={0.6}
          style={styles.cardContainer}>
        <Card style={styles.card}>
          <Text style={styles.cardHeader}>{structure.structure.structure_name}</Text>
          <Text style={styles.cardText}>{structure.structure.structure_description}</Text>
          <Image source={{uri: structure.structure.structure_image}} 
          style={{height: 30, width: 30, marginLeft: 'auto', marginRight: 'auto', marginTop: '2%'}}/>
          <Text>{this.calculateCompleted(structure)}</Text>
        </Card>
        </TouchableOpacity>
      ) 
    })
  }

  calculateCompleted = (structure) => {
    console.log(this.state.userCompletion)
    if (this.state.userCompletion) {
      let completedLearns = this.state.userCompletion[`${structure.structure.structure_name}`].learns.completed.length;
      let totalLearns = structure.learns.length
      let completedQuestions = this.state.userCompletion[`${structure.structure.structure_name}`].questions.completed.length;
      let totalQuestions = structure.questions.length
      let completedWhiteboards = this.state.userCompletion[`${structure.structure.structure_name}`].whiteboards.completed.length;
      let totalWhiteboards = structure.whiteboards.length
      return `Learns: ${completedLearns} out of ${totalLearns} | Questions: ${completedQuestions} out of ${totalQuestions} | Whiteboards: ${completedWhiteboards} out of ${totalWhiteboards}`
      // return (this.state.userCompletion[`${structure.structure_name}`].learns.completed.length) / (this.state.userCompletion[`${structure.structure_name}`].learns.total)
    }
    return "not here yet"
  }

  componentDidMount() {
    this.fetchStructures();
    // this.fetchUser();
  }

  // fetchUser = () => {
  //   let url = "http://localhost:3000/profile"
  //   let configObj = {
  //     method: 'GET',
  //     headers: {
  //       Authorization: `Bearer ${this.state.usertoken}`
  //     }
  //   }

  //   fetch(url, configObj)
  //   .then(resp => resp.json())
  //   .then(json => {this.setState({userInfo: json.user.userInfo, userCompletion: json.user.completion})})
  // }

  fetchStructures = () => {
    let url = "http://localhost:3000/structures"
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({structures: json}))
  }

  render() {
    console.log(this.state.userCompletion)
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


