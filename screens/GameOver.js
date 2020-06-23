import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import BodyText from '../components/BodyText'

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <Text>Game is Over</Text>
      <Text> Number of rounds: {props.roundsNumber} </Text>
      <Text>Number was {props.userNumber} </Text>
      <Button title="NEW GAME" onPress={props.onRestart}/>
    </View>
    );
  <View></View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})
 
export default GameOver;