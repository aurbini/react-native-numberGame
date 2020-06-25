import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import BodyText from '../components/BodyText'
import TitleText from '../components/Title'
import Colors from '../constants/colors'
import MainButton from '../components/MainButton'

const GameOver = props => {
  return (
    <View style={styles.screen}>
      <TitleText>Game is Over</TitleText>
      <View style={styles.imageContainer}>
        <Image 
          source={{uri:'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_1280.jpg'}}
          // source={require('../assets/success.png')}
          style={styles.image}
          resizeMode='cover'
        />
      </View>
      <BodyText style={styles.resolveText}>
        Your phone needed <Text style={styles.highlight}>{props.roundsNumber}</Text > rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
      <MainButton  
        onPress={props.onRestart}
      >
        New Game
      </MainButton>
    </View>
    );
  <View></View>
}

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }, 
  image: {
    width: '100%', 
    height: '100%'
  }, 
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: 'black',
    overflow: 'hidden',
    marginVertical: 30
  }, 
  highlight: {
    color: Colors.primary, 
    fontWeight: "bold",

  }, 
  resolveText: {
    textAlign: 'center', 
    fontSize: 20, 
    marginHorizontal: 20,
    marginVertical: 10
  }
})
 
export default GameOver;