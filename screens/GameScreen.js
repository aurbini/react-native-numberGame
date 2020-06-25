import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';

import Card from '../components/Card'
import NumberContainer from '../components/NumberContainter'
import MainButton from '../components/MainButton'

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

const GameScreen = (props) => {

  const { userChoice, onGameOver} = props
  const [ currentGuess, setCurrentGuess ] = useState(
    generateRandomBetween(1, 100, userChoice)
  )
  const [ rounds, setRounds ] = useState(0)
  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  useEffect(() => {
    if(currentGuess === userChoice){
      onGameOver(rounds)
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
      currentLow.current = currentGuess
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
    setCurrentGuess(nextNumber)
    setRounds(curRounds => curRounds + 1)
  }

  return (
    <View style={styles.screen}> 
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess} </NumberContainer>
      <Card style={styles.buttonContainer}>
        <MainButton 
          onPress={() => nextGuessHandler('lower')} 
        >
          Lower
        </MainButton>
        <MainButton 
          onPress={nextGuessHandler.bind(this, 'greater')} 
        >
          Upper
        </MainButton>
      </Card>
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
  }
})

export default GameScreen;