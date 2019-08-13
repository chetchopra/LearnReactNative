import React, { Component } from 'react';

import { ScrollView, Dimensions, Text, Image, } from 'react-native';

import HTML from 'react-native-render-html';




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
    const htmlContent = `<html>${this.state.learnContent}</html>`;
    const test = { h2: { textAlign: 'center', fontStyle: 'italic', color: 'grey' },
                   div: {paddingLeft: '1%', paddingRight: '1%'},
                   pre:  {backgroundColor: '#eee', border: '1px solid #999', display: 'flex', textAlign: 'center'}}
    return (
      <ScrollView>
        <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} tagsStyles={test}/>
      </ScrollView>
    )
  }
}
