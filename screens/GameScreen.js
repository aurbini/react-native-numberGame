import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert, ScrollView } from 'react-native';

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainter'
import MainButton from '../components/MainButton'
import { Ionicons } from '@expo/vector-icons'

const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  const rndNum = Math.floor(Math.random() * (max - min)) + min
  if(rndNum === exclude){
    return generateRandomBetween(min, max, exclude)
  } else {
    return rndNum
  }
}

const renderListItem = ( numOfGuesses, guess) => (
  <View key={guess} style={styles.listItem}>
      <Text>Round {numOfGuesses}</Text>    
    <Text>Guess {guess}</Text>
  </View>
)



const GameScreen = (props) => {

  const initialGuess = generateRandomBetween(1, 100, userChoice)

  const { userChoice, onGameOver} = props
  const [ currentGuess, setCurrentGuess ] = useState(initialGuess)
  const [ pastGuesses, setPastGuesses ] = useState([initialGuess])
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if(currentGuess === userChoice){
      onGameOver(pastGuesses.length)
    }
  }, [ currentGuess, userChoice, onGameOver])

  const nextGuessHandler = direction => {
    if(
      (direction === 'lower' && currentGuess < props.userChoice) ||
      (direction === 'greater' && currentGuess > props.userChoice)){
        Alert.alert('Don\'t lie!', 'You know that this is wrong', [
          {text: 'Sorry', style: 'cancel'}
        ])
        return 
    }
    if(direction === 'lower'){
      currentHigh.current = currentGuess
    }else{
      currentLow.current = currentGuess + 1
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    setPastGuesses(curPastGuesses => [nextNumber, ...curPastGuesses])
  }
  return (
    <View style={styles.screen}> 
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess} </NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton 
          onPress={() => nextGuessHandler('lower')} 
        >
          <Ionicons name="md-remove" size={24} color="white"/> 
        </MainButton>
        <MainButton 
          onPress={nextGuessHandler.bind(this, 'greater')} 
        >
          <Ionicons name="md-add" size={24} color="white" /> 
        </MainButton>
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
            {pastGuesses.map((guess, index ) => renderListItem(pastGuesses.length - index, guess))}
        </ScrollView>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    padding: 10, 
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginTop: 20, 
    width: 400, 
    maxWidth: '80%'
  }, 
  listContainer: {
    flex:1,
    width: '80%'
  },
  list: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexGrow: 1
  },
  listItem: {
    borderColor: '#ccc', 
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: 'space-around',
    padding: 15, 
    marginVertical: 10,
    backgroundColor: 'white',
    width: '60%'
  }
})

export default GameScreen;