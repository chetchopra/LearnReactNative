import React, { Component } from 'react';

import { 
  Text,
  View ,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'

import {
  Card,
  Container,
  Button
} from 'native-base'



export default class Question extends Component{
  constructor() {
    super();
    this.state = {
      question_query: "",
      question_answer_bank: "",
      question_solution: "",
      currentGuess: "",
      isSubmitted: false,
    }
  }

  fetchQuesionContent = () => {
    const id = this.props.navigation.getParam('question_id')
    let url = `http://localhost:3000/questions/${id}`
    fetch(url)
    .then(resp => resp.json())
    .then(json => {this.setState({
      question_query: json.question_query,
      question_answer_bank: JSON.parse(json.question_answer_bank),
      question_solution: json.question_solution})
      console.log(this.state)
    }
    )
  }

  componentDidMount() {
    this.fetchQuesionContent();
  }

  updateCurrentGuess = (guess) => {
    this.setState({currentGuess: guess,
                  isSubmitted: false})
  }

  generateAnswerBank = () => {
    ansBank = this.state.question_answer_bank;
    return Object.keys(ansBank).map((ans, idx) => {
      
      let appliedStyle = styles.multipleChoice
      if (this.state.isSubmitted && ans === this.state.currentGuess) {
        if (this.state.currentGuess === this.state.question_solution) {
          appliedStyle = styles.correctGuess;
        } else {
          appliedStyle = styles.incorrectGuess
        }
      } else {
        appliedStyle = (this.state.currentGuess === ans ? styles.currentGuess : styles.multipleChoice)
      }
      return <TouchableOpacity key={idx} style={appliedStyle} onPress={() => this.updateCurrentGuess(ans)}>
        <Text>{ans} : {ansBank[ans]}</Text>
      </TouchableOpacity>
    })
  }

  submitAnswer = () => {
    this.setState({isSubmitted: true})
  }


  render() {
    return (
      <View style={styles.view}>

        <Container style={styles.outerContainer}>

          <Container style={styles.questionContainer}>
            <Text style={styles.questionText}>{this.state.question_query}</Text>
          </Container>

          <Container style={styles.answersContainer}>
            {this.generateAnswerBank()}
          </Container>

          <Container style={styles.controlContainer}>
            <Button style={styles.controlButton}><Text>{"<--"}</Text></Button>
            <Button style={styles.controlButton} onPress={this.submitAnswer}><Text>Submit</Text></Button>
            <Button style={styles.controlButton}><Text>{"-->"}</Text></Button>
          </Container>
        
        </Container>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  multipleChoice: {
    borderWidth: 1,
    borderColor: 'red',
    marginTop: '2%',
    height: '20%',
    justifyContent: 'center',
    // paddingBottom: '3%'
  },
  currentGuess: {
    borderWidth: 1,
    borderColor: 'red',
    backgroundColor: 'gray',
    marginTop: '2%',
    height: '20%',
    justifyContent: 'center',
    // paddingBottom: '3%',
  },
  incorrectGuess: {
    borderWidth: 1,
    borderColor: 'red',
    marginTop: '2%',
    height: '20%',
    justifyContent: 'center',
    backgroundColor: 'red',
  },
  correctGuess: {
    borderWidth: 1,
    borderColor: 'red',
    marginTop: '2%',
    height: '20%',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
  view: {
    flex: 1,
    paddingTop: '5%',
    alignItems: 'center',
    backgroundColor: '#565656',
  },
  outerContainer: {
    width: '90%',
    height: '70%',
    backgroundColor: 'red',
    borderRadius: 5, 
  },
  questionContainer: {
    width: '100%',
    height: '50%',
    paddingTop: '20%',
    backgroundColor: 'green',
    borderRadius: 5, 
  },
  answersContainer: {
    width: '100%',
    height: '50%',
    backgroundColor: 'yellow',
    borderRadius: 5, 
  },
  controlContainer: {
    flexWrap: 'nowrap',
    borderRadius: 5, 
    flexDirection: 'row',
    height: '10%',

  },
  controlButton: {
    width: '30%',
    // marginLeft: '1%',
    // marginRight: '1%',
  },
  questionText: {
    textAlign: 'center',
  }, 
  questionImage: {

  },
})
