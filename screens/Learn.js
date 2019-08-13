import React, { Component } from 'react';

import { Text } from 'react-native'



export default class Learn extends Component{
  constructor() {
    super();
    this.state = {
      learnContent: ""
    }
  }
  
 

  fetchLearnContent = () => {
    const id = this.props.navigation.getParam('learn_id')
    let url = `http://localhost:3000/learns/${id}`
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({learnContent: json.learn_content}))
  }

  componentDidMount() {
    this.fetchLearnContent();
  }


  render() {
    return (
      <Text>{this.state.learnContent}</Text>
    )
  }
}
