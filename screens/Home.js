import React, { Component } from 'react';
import { Card, ListItem, Button, Icon, Header } from 'react-native-elements'

import {
  StyleSheet,
  ScrollView,
  Text,
  Image,
  StatusBar,
} from 'react-native';




export default class Home extends Component {
  static navigationOptions = {
    title: 'Home',
  };
  
  constructor() {
    super();
    this.state = {
      structures: []
    }
  }

  navigateToCategoryView = (structure) => {
    console.log(structure)
    this.props.navigation.navigate('CategoryView', {sections: {
                                                  learns: structure.learns,
                                                  questions: structure.questions,
                                                  whiteboards: structure.whiteboards
                                                  
    }})
  }

  generateDataStructureCards = () => {
    return this.state.structures.map((structure, idx) => {
      return (
        <Card key={idx}>
          <Text>{structure.structure.structure_name}</Text>
          <Text>{structure.structure.structure_description}</Text>
          <Button title="Go"
                onPress={() => {this.navigateToCategoryView(structure, this.props)}}
        />
        </Card>
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
      <ScrollView>
        {/* {this.state.structures.length < 1 ?
          <Image
          style={styles.stretch}
          source={{uri: "https://media.giphy.com/media/TvLuZ00OIADoQ/giphy.gif"}}
          />
          : 
          this.generateDataStructureCards(this.props)} */}
          {this.generateDataStructureCards(this.props)}
          
      </ScrollView>
    )

  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch'
  },
})


