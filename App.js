import React, { Component } from 'react';
import Navigation from './navigation/index';


export default class App extends Component {
  constructor() {
    super();
    this.state = {
      structures: [],
      isLoggedIn: 1
    }
  }
  

  componentDidMount() {
    let url = "http://localhost:3000/structures"
    fetch(url)
    .then(resp => resp.json())
    .then(json => this.setState({structures: json}))
  }

  changeState = () => {
    this.setState({isLoggedIn: 10})
  }

  render() {
    return (
        <Navigation/>
    )
  }


};





