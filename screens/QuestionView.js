import React from 'react'

import { 
  ScrollView, 
  Text,
  Image,
  TouchableOpacity,
 } from 'react-native'

import { 
  Card, 
 } from 'native-base'

export default function QuestionView(props) {
  const { navigation } = props

  const questions = navigation.getParam('questions')

  console.log(questions)

  const naviagteToQuestion = (idx, questionIds) => {
    props.navigation.navigate('Question', {questionIndex: idx, questionIds: questionIds})
  }

  const generateQuestionCards = () => {
    let questionIds = []
    return questions.map((question, idx) => {

      questionIds.push(question.id);
      console.log(questionIds)

      return <TouchableOpacity key={idx} 
                               onPress={() => naviagteToQuestion(idx, questionIds)} 
                               activeOpacity={0.6}
                               style={styles.cardContainer}>
               <Card style={styles.card}>
                 <Text style={styles.cardHeader}>{question.question_title}</Text>
                 {/* <Text>{learn.learn_description}</Text> */}
               </Card>
             </TouchableOpacity>
             
    })
  }

  return (
    <ScrollView style={{backgroundColor: '#565656'}}>
      {generateQuestionCards()}
    </ScrollView>
  )
}

const styles = {
  cardContainer: {
    marginLeft: '2%',
    marginRight: '2%'
  },
  card: {
    borderRadius: 5, 
    height: 100, 
    backgroundColor: '#C09F80',
    justifyContent: 'center',

  },
  cardHeader: {
    fontWeight: '300',
    textAlign: 'center', 
    fontSize: 25
  }
}