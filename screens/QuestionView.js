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

  const naviagteToQuestion = (id) => {
    props.navigation.navigate('Question', {question_id: id})
  }

  const generateQuestionCards = () => {
    return questions.map((question, idx) => {
      return <TouchableOpacity key={idx} 
                               onPress={() => naviagteToQuestion(question.id)} 
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