import React from 'react'

import { 
  StyleSheets, 
  ScrollView, 
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
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

  console.log(learns)

  const naviagteToLearn = (id) => {
    props.navigation.navigate('Learn', {learn_id: id})
  }

  const generateLearnCards = () => {
    return learns.map((learn, idx) => {
      return <TouchableOpacity key={idx} 
                               onPress={() => naviagteToLearn(learn.id)} 
                               activeOpacity={0.6}>
               <Card  containerStyle={{backgroundColor: 'gray'}}>
                 <Text>{learn.learn_title}</Text>
                 <Text>{learn.learn_description}</Text>
               </Card>
             </TouchableOpacity>
             
    })
  }

  
  return (
    <ScrollView>
      {generateLearnCards()}
    </ScrollView>

  )
}

