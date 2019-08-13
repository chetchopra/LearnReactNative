import React from 'react'

import { 
  StyleSheets, 
  ScrollView, 
  Text,
 } from 'react-native'

import { 
  Card, 
  ListItem, 
  Button, 
  Icon,
 } from 'react-native-elements'


export default function LearnView(props) {
  const { navigation } = props

  const learns = navigation.getParam('learns')

  const naviagteToLearn = (id) => {
    props.navigation.navigate('Learn', {learn_id: id})
  }

  const generateLearnCards = () => {
    return learns.map((learn, idx) => {
      console.log(learn)
      return <Card key={idx}>
               <Text>{learn.learn_title}</Text>
               <Text>{learn.learn_description}</Text>
               <Button title="Go"
                       onPress={() => naviagteToLearn(learn.id)}/>
             </Card>
    })
  }

  

  
  return (
    <ScrollView>
      {generateLearnCards()}
    </ScrollView>

  )
}