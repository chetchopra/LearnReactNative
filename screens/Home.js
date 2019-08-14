import React, { Component } from 'react';

import {
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  
} from 'react-native';

import { 
  Card,
} from 'native-base';



export default class Home extends Component {
  static navigationOptions = {
    title: 'Structures',
  };
  
  constructor() {
    super();
    this.state = {
      structures: []
    }
  }

  navigateToCategoryView = (structure) => {
    // console.log(structure)
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
      // console.log(structure)
      return (
        <TouchableOpacity key={idx} onPress={() => {this.navigateToCategoryView(structure, this.props)}}
          activeOpacity={0.6}
          style={styles.cardContainer}>
        <Card style={styles.card}>
          <Text style={styles.cardHeader}>{structure.structure.structure_name}</Text>
          <Text style={styles.cardText}>{structure.structure.structure_description}</Text>
          <Image source={{uri: structure.structure.structure_image}} 
          style={{height: 30, width: 30, marginLeft: 'auto', marginRight: 'auto', marginTop: '2%'}}/>
        </Card>
        </TouchableOpacity>
      )
    })
  }

  componentDidMount() {
    let url = "http://localhost:3000/structures"
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({structures: json}))

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


