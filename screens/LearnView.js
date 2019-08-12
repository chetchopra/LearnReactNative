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

  const generateLearnCards = () => {
    return learns.map((learn, idx) => {
      return <Card key={idx}>
               <Text>{learn.learn_content}</Text>
             </Card>
    })
  }

  

  
  return (
    <ScrollView>
      {generateLearnCards()}
    </ScrollView>

  )
}