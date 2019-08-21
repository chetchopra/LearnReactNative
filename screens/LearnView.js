import React from 'react'

import { 
  ScrollView, 
  // Text,
  TouchableOpacity,
  StyleSheet,
 } from 'react-native'

import { 
  Card,
  Button, 
  Text 
 } from 'native-base';



export default function LearnView(props) {
  const { navigation } = props

  const learns = navigation.getParam('learns')

  const naviagteToLearn = (id) => {
    props.navigation.navigate('Learn', {learn_id: id})
  }

  const determineButton = (learnId) => {
    let completedLearns = navigation.getParam('completedLearns');
    completedLearns.forEach((cLearn) => {
      if (cLearn.learn_id === learnId) {
        console.log("fuck")
      }
    })
    
  }

  const generateLearnCards = () => {
    return learns.map((learn, idx) => {
      console.log(learn)
      return <TouchableOpacity key={idx} 
                               onPress={() => naviagteToLearn(learn.id)} 
                               activeOpacity={0.6}
                               style={styles.cardContainer}>
               <Card style={styles.card}>
                 <Text style={styles.cardHeader}>{learn.learn_title}</Text>
                 {/* <Text>{learn.learn_description}</Text> */}
                 <Button onPress={() => {learnTopic(learn.id, learn.structure_id)}}><Text>Learn</Text></Button>
                 {determineButton(learn.id)}
               </Card>
             </TouchableOpacity>
             
    })
  }

  const learnTopic = (learnId, structureId) => {
    let userToken = navigation.getParam('userToken')
    let url = "http://localhost:3000/completelearn"
    let configObj = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userToken}`
      },
      body: JSON.stringify({
        info: {
          learn_id: learnId, 
          structure_id: structureId
        }
      })
    }

    fetch(url, configObj)
    .then(resp => resp.json())
    .then(json => console.log(json))
  }

  
  return (
    <ScrollView style={{backgroundColor: '#565656'}}>
      {generateLearnCards()}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
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
  },
  learnButton: {

  }, 
  forgetButton: {

  }
})


