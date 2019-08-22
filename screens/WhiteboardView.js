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
  Text,
  Icon, 
 } from 'native-base';

 import AsyncStorage from '@react-native-community/async-storage'





export default class WhiteboardView extends Component {
  constructor(props) {
    super()
    this.state = {
      whiteboards: [],
      userToken: null,
      currentStructureId: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Whiteboarding',
      headerRight: (
        <Button transparent onPress={navigation.openDrawer}>
          <Icon style={{color: 'black'}} name='cog'/>
        </Button>
    ),
  }};

  getTokenAndStructure = () => {
    AsyncStorage.multiGet(["token", "currentStructure"])
    .then(resp => {
      this.setState({userToken: resp[0][1], currentStructureId: resp[1][1]});
      this.fetchWhiteboardDetails();
      // this.fetchQuestionDetails();
    })
  }

  componentDidMount() {
    this.getTokenAndStructure();
  }

  fetchWhiteboardDetails = () => {
    let url = `http://localhost:3000/whiteboarddetails/${this.state.currentStructureId}`
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
      this.setState({whiteboards: json})
      console.log(json)
    })
  }


  naviagteToWhiteboard = (id) => {
    this.props.navigation.navigate('Whiteboard', {whiteboard_id: id})
  }

  // isLearned = (whiteboardId) => {
  //   let result = false
  //   this.state.completedLearns.forEach((cLearn) => {
  //     if (cLearn.learn_id === learnId) {
  //       result = true
  //     } 
  //   })
  //   return result
  // }

  generateWhiteboardCards = () => {
    return this.state.whiteboards.map((whiteboard, idx) => {
      console.log(whiteboard.isComplete)
      return <TouchableOpacity key={idx} 
                               onPress={() => this.naviagteToWhiteboard(whiteboard.whiteboard_id)} 
                               activeOpacity={0.6}
                               style={styles.cardContainer}>
               <Card style={styles.card}>

                 

                 <Text style={styles.cardHeader}>{whiteboard.whiteboard_title}</Text>

                 <View style={{flex: 1, flexDirection: 'row'}}>
                 <Button onPress={() => {this.forgetTopic(whiteboard.whiteboard_id)}} disabled={!whiteboard.isComplete} 
                  style={styles.forgetButton}><Text>Forget</Text></Button>
                 <Button onPress={() => {this.whiteboardTopic(whiteboard.whiteboard_id)}} disabled={whiteboard.isComplete}
                  style={styles.whiteboardButton}><Text>Learn</Text></Button>
                 </View>
               </Card>
             </TouchableOpacity>
             
    })
  }

  whiteboardTopic = (whiteboardId) => {
    // let userToken = navigation.getParam('userToken')
    let url = "http://localhost:3000/completewhiteboard"
    let configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.userToken}`
      },
      body: JSON.stringify({
        info: {
          whiteboard_id: whiteboardId, 
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
      this.completeWhiteboardInState(json.completedWhiteboard.whiteboard_id)

    })
  }

  completeWhiteboardInState = (whiteboardId) => {
    let newWhiteboards = this.state.whiteboards
    newWhiteboards.forEach((whiteboard) => {
      
      if (whiteboard.whiteboard_id === whiteboardId) {
        whiteboard.isComplete = true;
      }
    })
    this.setState({completedWhiteboards: newWhiteboards})
    let increaseCompletedWhiteboards = this.props.navigation.getParam('increaseCompletedWhiteboards')
    increaseCompletedWhiteboards();
  }

  forgetWhiteboardInState = (whiteboardId) => {
    let newWhiteboards = this.state.whiteboards
    newWhiteboards.forEach((whiteboard) => {
      
      if (whiteboard.whiteboard_id === whiteboardId) {
        whiteboard.isComplete = false;
      }
    })
    this.setState({completedWhiteboards: newWhiteboards})
    let decreaseCompletedWhiteboards = this.props.navigation.getParam('decreaseCompletedWhiteboards')
    decreaseCompletedWhiteboards();
  }

  forgetTopic = (whiteboardId) => {
    let url = "http://localhost:3000/completewhiteboard"
    let configObj = {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.userToken}`
      },
      body: JSON.stringify({
        info: {
          whiteboard_id: whiteboardId, 
          structure_id: this.state.currentStructureId
        }
      })
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {this.forgetWhiteboardInState(json.deletedWhiteboard.whiteboard_id);console.log(json)})
  }

  render() {
    return (
      <ScrollView style={{backgroundColor: '#565656'}}>
      {this.generateWhiteboardCards()}
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
  whiteboardButton: {
    marginLeft: 'auto',
    marginTop: 'auto',
  }, 
  forgetButton: {
    marginRight: 'auto',
    marginTop: 'auto',
  }
})


