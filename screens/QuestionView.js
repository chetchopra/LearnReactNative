import React, { Component } from 'react'

import { 
  ScrollView, 
  Text,
  Image,
  TouchableOpacity,
 } from 'react-native'

import { 
  Card, 
  Button,
  Icon,
 } from 'native-base'

import AsyncStorage from '@react-native-community/async-storage'





export default class QuestionView extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      userToken: null,
      currentStructureId: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Questions',
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
      this.fetchQuestionDetails();
    })
  }

  updateCompletionStatus = (questionId) => {
    let newQuestions = this.state.questions
    newQuestions.forEach((question) => {
      
      if (question.question_id === questionId) {
        question.isComplete = true;
        let increaseCompletedQuestions = this.props.navigation.getParam('increaseCompletedQuestions')
        increaseCompletedQuestions();
      }
    })
    this.setState({questions: newQuestions})
  }

  componentDidMount() {
    this.getTokenAndStructure()
  }

  fetchQuestionDetails = () => {
    let url = `http://localhost:3000/questiondetails/${this.state.currentStructureId}`
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
      this.setState({questions: json})
      // console.log(json)
    })
  }

  naviagteToQuestion = (idx, questionIds) => {
    this.props.navigation.navigate('Question', {questionIndex: idx, 
                                                questionIds: questionIds,
                                                updateCompletionStatus: this.updateCompletionStatus,
                                           //isComplete: isCompleted(questionIds[idx]),
                                          })
  }

  generateQuestionCards = () => {
    let questionIds = []
    return this.state.questions.map((question, idx) => {
      questionIds.push(question.question_id);
      console.log(question.isComplete)
      return <TouchableOpacity key={idx} 
                               onPress={() => this.naviagteToQuestion(idx, questionIds)} 
                               activeOpacity={0.6}
                               style={styles.cardContainer}>
               <Card style={question.isComplete ? styles.completedCard : styles.card}>
                 <Text style={styles.cardHeader}>{question.question_title}</Text>
                 <Text style={styles.cardDifficulty}>Difficulty: {question.question_difficulty}</Text>
               </Card>
             </TouchableOpacity>
             
    })
  }

  render() {
    return (
    <ScrollView style={{backgroundColor: '#565656'}}>
      {this.generateQuestionCards()}
    </ScrollView>
    )
  }
}



// export default function QuestionView(props) {
//   const { navigation } = props

//   const questions = navigation.getParam('questions')

//   console.log(navigation.getParam('completedQuestions'))

//   console.log(questions)

//   const naviagteToQuestion = (idx, questionIds, structureId) => {
//     props.navigation.navigate('Question', {questionIndex: idx, questionIds: questionIds,
//                                            userToken: navigation.getParam('userToken'), 
//                                            structureId: structureId,
//                                            isComplete: isCompleted(questionIds[idx]),
//                                           })
//   }

//   const isCompleted = (id) => {
//     let completedQuestions = navigation.getParam('completedQuestions').completed
//     console.log(completedQuestions)
//     let result = false;
//     completedQuestions.forEach((question) => {
//       if (question.id === id) {
//         result = true
//       }
//     })

//     return result;
//   }

  // const generateQuestionCards = () => {
  //   let questionIds = []
  //   return questions.map((question, idx) => {

  //     questionIds.push(question.id);
  //     console.log(questionIds)

  //     return <TouchableOpacity key={idx} 
  //                              onPress={() => naviagteToQuestion(idx, questionIds, question.structure_id)} 
  //                              activeOpacity={0.6}
  //                              style={styles.cardContainer}>
  //              <Card style={styles.card}>
  //                <Text style={styles.cardHeader}>{question.question_title}</Text>
  //                {/* <Text>{learn.learn_description}</Text> */}
  //              </Card>
  //            </TouchableOpacity>
             
  //   })
  // }

//   return (
//     <ScrollView style={{backgroundColor: '#565656'}}>
//       {generateQuestionCards()}
//     </ScrollView>
//   )
// }

const styles = {
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
  cardDifficulty: {
    fontWeight: '200',
    textAlign: 'center', 
    paddingTop: '2%', 
  },
  completedCard: {
    height: '100%', 
    backgroundColor: '#5E8254',
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
}