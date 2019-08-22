import React, { Component } from 'react';
import { HeaderBackButton } from 'react-navigation';

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

import { colors } from 'react-native-elements';

import AsyncStorage from '@react-native-community/async-storage'

         

export default class Question extends Component{
  constructor(props) {
    super();
    this.state = {
      userToken: null,
      question_query: "",
      question_answer_bank: "",
      question_solution: "",
      currentGuess: "",
      isSubmitted: false,
      questionIds: props.navigation.getParam('questionIds'),
      questionIndex: props.navigation.getParam('questionIndex'),
      isComplete: false,
      currentStructureId: null
    }
  }

  static navigationOptions = ({navigation}) => {
    return{
      headerLeft:(<HeaderBackButton onPress={()=>{navigation.navigate('QuestionView')}}/>),
   }
  }

  // getToken = () => {
  //   AsyncStorage.getItem("token")
  //   .then(resp => {
  //     this.setState({userToken: resp})
  //     this.fetchQuesionContent();
  //     // this.setState({userToken: resp[0][1], currentStructureId: resp[1][1]});
  //     // this.fetchQuestionDetails();
  //   })
  // }

  getTokenAndStructure = () => {
    AsyncStorage.multiGet(["token", "currentStructure"])
    .then(resp => {
      this.setState({userToken: resp[0][1], currentStructureId: resp[1][1]});
      this.fetchQuesionContent();
    })
  }

  fetchQuesionContent = () => {
    const id = this.state.questionIds[this.state.questionIndex]

    console.log(this.state.questionIds)
    console.log(this.state.questionIndex)

    let url = `http://localhost:3000/questions/${id}`
    let configObj = {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.userToken}`
      }
    }
    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {console.log(json);this.setState({
      
      question_query: json.question_query,
      question_answer_bank: JSON.parse(json.question_answer_bank),
      question_solution: json.question_solution,
      isComplete: json.isComplete
    })
      if (json.isComplete) {
        this.markCompleted()
      }
    }
    )
  }

  markCompleted = () => {
    
    if (this.state.isComplete) {
      this.setState({currentGuess: this.state.question_solution, isSubmitted: true})
    }
  }

  completeQuestion = () => {
    // console.log("complete q was called")
    const questionId = this.state.questionIds[this.state.questionIndex]

    let url = "http://localhost:3000/completequestion"
    let configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.state.userToken}`
      },
      body: JSON.stringify({
        info: {
          question_id: questionId, 
          structure_id: this.state.currentStructureId
        }
      })
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => {
      this.setState({isComplete: true})
      let questionId = this.state.questionIds[this.state.questionIndex]
      let update = this.props.navigation.getParam('updateCompletionStatus') 
      update(questionId);
      this.markCompleted();
    })
  }

  componentDidMount() {
    this.getTokenAndStructure()
    // this.fetchQuesionContent();
  }

  updateCurrentGuess = (guess) => {
    this.setState({currentGuess: guess,
                  isSubmitted: false})
  }

  // naviagteToQuestion = () => {
  //   this.props.navigation.push('Question', {question_id: 2, updateCompletionStatus: this.props.updateCompletionStatus})
  // }

  canMoveRight = () => {
    return (this.state.questionIds.length - 1 > this.state.questionIndex)
  }

  canMoveLeft = () => {
    return (this.state.questionIndex > 0)
  }

  moveRight = () => {
    this.props.navigation.push('Question', {questionIndex: this.state.questionIndex + 1, 
                                            questionIds: this.state.questionIds, 
                                            updateCompletionStatus: this.props.navigation.getParam('updateCompletionStatus') })
  }

  moveLeft = () => {
    
    // this.props.navigation.push('Question', {questionIndex: this.state.questionIndex - 1, questionIds: this.state.questionIds})
    // UPDATE NEEDS TO GO BACK WITH IT 
    this.props.navigation.goBack();
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
        <Text style={styles.answerText}> {ans}{')'} {ansBank[ans]}</Text>
      </TouchableOpacity>
    })
  }

  submitAnswer = () => {
    this.setState({isSubmitted: true})
    // console.log(this.state)
    // console.log(this.state.currentGuess === this.state.question_solution && !this.state.isCompleted)
    if (this.state.currentGuess === this.state.question_solution && !this.state.isComplete) {
      this.completeQuestion()
    } else {
      //alert("youre a failure")
    }
  }


  render() {
    return (
      <View style={styles.view}>

        <Container style={styles.outerContainer}>

          <Text>{this.state.isComplete ? "Completed" : null}</Text>

          <Container style={styles.questionContainer}>
            <Text style={styles.questionText}>{this.state.question_query}</Text>
          </Container>

          <Container style={styles.answersContainer}>
            {this.generateAnswerBank()}
          </Container>

          <Container style={styles.controlContainer}>
            <Button style={styles.controlButtonLeft} onPress={this.moveLeft} ><Text style={styles.buttonText}>{"<--"}</Text></Button>
            <Button style={styles.controlButtonSubmit} onPress={this.submitAnswer}><Text style={styles.buttonText}>Submit</Text></Button>
            <Button style={styles.controlButtonRight} onPress={this.moveRight} disabled={!this.canMoveRight()}><Text style={styles.buttonText}>{"-->"}</Text></Button>
          </Container>
        
        </Container>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  multipleChoice: {
    borderWidth: 1,
    borderColor: '#76323F',
    marginTop: '2%',
    height: '20%',
    justifyContent: 'center',
    borderRadius: 5, 
    // paddingBottom: '3%'
  },
  currentGuess: {
    borderWidth: 1,
    borderColor: '#76323F',
    backgroundColor: '#D9D9D9',
    marginTop: '2%',
    height: '20%',
    justifyContent: 'center',
    borderRadius: 5, 
    // paddingBottom: '3%',
  },
  incorrectGuess: {
    borderWidth: 1,
    borderColor: '#76323F',
    marginTop: '2%',
    height: '20%',
    justifyContent: 'center',
    backgroundColor: '#B56357',
    borderRadius: 5, 
  },
  correctGuess: {
    borderWidth: 1,
    borderColor: '#76323F',
    marginTop: '2%',
    height: '20%',
    justifyContent: 'center',
    backgroundColor: '#5E8254',
    borderRadius: 5, 
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
    backgroundColor: '#828081',
    borderRadius: 5, 
  },
  questionContainer: {
    width: '100%',
    height: '50%',
    paddingTop: '20%',
    backgroundColor: '#828081',
    borderRadius: 5, 
    //borderWidth: 1,
    //borderColor: 'red',
  },
  answersContainer: {
    width: '100%',
    height: '30%',
    backgroundColor: '#828081',
  },
  controlContainer: {
    flexWrap: 'nowrap',
    borderRadius: 5, 
    flexDirection: 'row',
    maxHeight: '8%',
    backgroundColor: '#828081',
    // marginTop: '20%',
  },
  controlButtonLeft: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    marginRight: 'auto',
    backgroundColor: '#76323F',
    // marginLeft: '1%',
    // marginRight: '1%',
  },
  controlButtonSubmit: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#76323F',
    // marginLeft: '1%',
    // marginRight: '1%',
  },
  controlButtonRight: {
    width: '30%',
    height: '100%',
    justifyContent: 'center',
    marginLeft: 'auto',
    backgroundColor: '#76323F',
    // marginLeft: '1%',
    // marginRight: '1%',
  },
  buttonText: {
    fontSize: 22, 
    fontWeight: '200',
    color: 'white',
  },
  questionText: {
    textAlign: 'center',
    fontSize: 22, 
    fontWeight: '300'
  }, 
  answerText: {
    fontSize: 20, 
    fontWeight: '300'
  },
  questionImage: {

  },
})
