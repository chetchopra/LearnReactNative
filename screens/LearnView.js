import React, { Component } from 'react'

import { 
  ScrollView, 
  // Text,
  TouchableOpacity,
  StyleSheet,
  View,
 } from 'react-native'

import { 
  Card,
  Button, 
  Text 
 } from 'native-base';

 import AsyncStorage from '@react-native-community/async-storage'





export default class LearnView extends Component {
  constructor(props) {
    super()
    this.state = {
      learns: [],
      userToken: null,
      currentStructureId: null,
    }
  }

  getTokenAndStructure = () => {
    AsyncStorage.multiGet(["token", "currentStructure"])
    .then(resp => {
      this.setState({userToken: resp[0][1], currentStructureId: resp[1][1]});
      this.fetchLearnDetails();
      // this.fetchQuestionDetails();
    })
  }

  componentDidMount() {
    this.getTokenAndStructure();
  }

  fetchLearnDetails = () => {
    let url = `http://localhost:3000/learndetails/${this.state.currentStructureId}`
    let configObj = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.userToken}`
      }
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      this.setState({learns: json})
      console.log(json)
    })
  }


  naviagteToLearn = (id) => {
    this.props.navigation.navigate('Learn', {learn_id: id})
  }

  isLearned = (learnId) => {
    let result = false
    this.state.completedLearns.forEach((cLearn) => {
      if (cLearn.learn_id === learnId) {
        result = true
      } 
    })
    return result
  }

  generateLearnCards = () => {
    return this.state.learns.map((learn, idx) => {
      console.log(learn.isComplete)
      return <TouchableOpacity key={idx} 
                               onPress={() => this.naviagteToLearn(learn.learn_id)} 
                               activeOpacity={0.6}
                               style={styles.cardContainer}>
               <Card style={styles.card}>

                 

                 <Text style={styles.cardHeader}>{learn.learn_title}</Text>

                 <View style={{flex: 1, flexDirection: 'row'}}>
                 <Button onPress={() => {this.forgetTopic(learn.learn_id)}} disabled={!learn.isComplete} 
                  style={styles.forgetButton}><Text>Forget</Text></Button>
                 <Button onPress={() => {this.learnTopic(learn.learn_id)}} disabled={learn.isComplete}
                  style={styles.learnButton}><Text>Learn</Text></Button>
                 </View>
               </Card>
             </TouchableOpacity>
             
    })
  }

  learnTopic = (learnId) => {
    // let userToken = navigation.getParam('userToken')
    let url = "http://localhost:3000/completelearn"
    let configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.userToken}`
      },
      body: JSON.stringify({
        info: {
          learn_id: learnId, 
          structure_id: this.state.currentStructureId
        }
      })
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      // let update = this.props.navigation.getParam('updateCompletedLearns');
      // update(json)
      console.log(json)
      this.completeLearnInState(json.completedLearn.learn_id)

    })
  }

  completeLearnInState = (learnId) => {
    let newLearns = this.state.learns
    newLearns.forEach((learn) => {
      
      if (learn.learn_id === learnId) {
        learn.isComplete = true;
      }
    })
    this.setState({completedLearns: newLearns})
    let increaseCompletedLearns = this.props.navigation.getParam('increaseCompletedLearns')
    increaseCompletedLearns();
  }

  forgetLearnInState = (learnId) => {
    let newLearns = this.state.learns
    newLearns.forEach((learn) => {
      
      if (learn.learn_id === learnId) {
        learn.isComplete = false;
      }
    })
    this.setState({completedLearns: newLearns})
    let decreaseCompletedLearns = this.props.navigation.getParam('decreaseCompletedLearns')
    decreaseCompletedLearns();
  }

  forgetTopic = (learnId) => {
    let url = "http://localhost:3000/completelearn"
    let configObj = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.userToken}`
      },
      body: JSON.stringify({
        info: {
          learn_id: learnId, 
          structure_id: this.state.currentStructureId
        }
      })
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {this.forgetLearnInState(json.deletedLearn.learn_id);console.log(json)})
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#565656'}}>
      {this.generateLearnCards()}
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginLeft: '2%',
    marginRight: '2%',
    borderRadius: 5,
    height: 100,
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
  learnButton: {
    marginLeft: 'auto',
    marginTop: 'auto',
  }, 
  forgetButton: {
    marginRight: 'auto',
    marginTop: 'auto',
  }
})


