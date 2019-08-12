import React, { Component } from 'react'

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


export default class Learn extends Component {
  constructor() {
    super();
    this.state = {learns: this.props.learns}
  }

  generateLearnCards = () => {
    return this.state.learns.map((learn) => {
      return <Text>fdsj</Text>
    })
  }

  render() {
    return (
      this.generateLearnCards()
    )
  }
}


