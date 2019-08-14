import React from 'react'

import { 
  ScrollView, 
  Image,
  Text,
 } from 'react-native'

import { 
  Card, 
 } from 'native-base'

export default function Whiteboard() {
  return (
    <ScrollView style={{backgroundColor: '#565656'}}>
      <Card>
        <Image source={{uri: "https://media.giphy.com/media/1XgIXQEzBu6ZWappVu/giphy.gif"}}
        style={styles.image}/>  
      </Card>
      <Text style={styles.text}>I'm working on it. It'll be legit. I swear...</Text>
    </ScrollView>
  )
}

const styles = {
  image: {
    height: 400,
    width: '100%',
  },
  text : {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '300'
  }
}