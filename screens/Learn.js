import React, { Component } from 'react';

import { ScrollView, Dimensions, Image, } from 'react-native';

import HTML from 'react-native-render-html';


export default class Learn extends Component{
  constructor() {
    console.disableYellowBox = true;
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
    const htmlContent = `${this.state.learnContent}`;
    const test = { h2: { textAlign: 'center', fontStyle: 'italic', color: 'grey' },
                    h1: {textAlign: 'center'},
                   div: {paddingLeft: '1%', paddingRight: '1%'},
                   //pre:  {backgroundColor: '#eee', border: '1px solid #999', display: 'flex', textAlign: 'center'},
                   //img: {width: '30px', margin: 'auto'},
                  html: {backgroundColor: 'gray'},
                }

  
      return this.state.learnContent === "" ? <Image source={{uri: 'https://raw.githubusercontent.com/chetchop/Javascript---Loan-Calculator/master/img/loading.gif'}} style={styles.loadingImage}/>
      :
      <ScrollView>
        <HTML html={htmlContent} imagesMaxWidth={Dimensions.get('window').width} tagsStyles={test}/>
      </ScrollView>
  }
}

const styles = {
  loadingImage: {
    height: 400, 
    width: 300,
    justifyContent: 'center',
  }
}
