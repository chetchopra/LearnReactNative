import React, { Component } from 'react';
import Navigation from './navigation/index';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      structures: []
    }
  }

  componentDidMount() {
    let url = "http://localhost:3000/structures"
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({structures: json}))
  }

  render() {
    return (
        <Navigation structres={this.state.structures}/>
    )
  }


};





