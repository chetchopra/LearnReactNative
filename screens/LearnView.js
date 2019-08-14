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
 } from 'native-base';


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
                               activeOpacity={0.6}
                               style={styles.cardContainer}>
               <Card style={styles.card}>
                 <Text style={styles.cardHeader}>{learn.learn_title}</Text>
                 {/* <Text>{learn.learn_description}</Text> */}
               </Card>
             </TouchableOpacity>
             
    })
  }

  
  return (
    <ScrollView style={{backgroundColor: '#565656'}}>
      {generateLearnCards()}
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


