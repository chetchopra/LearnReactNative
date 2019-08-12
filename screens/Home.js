import React from 'react';
import { Card, ListItem, Button, Icon } from 'react-native-elements'

import {
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';



export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      structures: []
    }
  }

  navigateToCategoryView = (structure, props) => {
    props.navigation.navigate('CategoryView', {sections: {
                                                  learns: structure.learns,
                                                  questions: structure.questions,
                                                  whiteboards: structure.whiteboards
                                                  
    }})
  }

  generateDataStructureCards = (props) => {
    return this.state.structures.map((structure, idx) => {
      return (
        <Card key={idx}>
          <Text>{structure.structure.structure_name}</Text>
          <Text>{structure.structure.structure_description}</Text>
          <Button title="Go"
                onPress={() => {this.navigateToCategoryView(structure, props)}}
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
})

