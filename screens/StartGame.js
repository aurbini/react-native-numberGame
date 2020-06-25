import React, { useState } from 'react';
import { 
  View,
  Text,
  StyleSheet, 
  Button, 
  TouchableWithoutFeedback, 
  Keyboard,
  Alert
} from 'react-native'
import Card from '../components/Card'
import Colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainter'
import BodyText from '../components/BodyText'
import DefaultStyle from '../constants/default-styles'
import defaultStyles from '../constants/default-styles';
import MainButton from '../components/MainButton'

const StartGame = ({ onStartGame }) => {

  const [ enteredValue, setEnteredValue ] = useState('')
  const [ confirmed, setConfirmed ] = useState(false)
  const [ selectedNumber, setSelectedNumber ] = useState()

  const numberInputHandler = inputText => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''))
  }

  const resetInputHandler = () => {
    setEnteredValue('')
    setConfirmed(false)
  }

  const confirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue)
    if( isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('invalid number', 'number has to be a number between 1 and 99', [{text:'Okay', style: 'destructive', onPress: resetInputHandler}])
    }
    setConfirmed(true)
    setEnteredValue('')
    setSelectedNumber(chosenNumber)
    Keyboard.dismiss()
  }

  let confirmedOutput

  if(confirmed){
    confirmedOutput = (
      <Card style={styles.summaryContainer}>
        <BodyText> 
          Chosen Number:
        </BodyText>
        <NumberContainer>
          {selectedNumber}
        </NumberContainer>
        <MainButton 
          onPress={() => onStartGame(selectedNumber)} 
        >
          Start Game
        </MainButton>
      </Card>
    )
  }

  return ( 
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
    }}>
      <View style={styles.screen}> 
        <Text style={{...defaultStyles.title, ...styles.titleMargin}}>Start a new game</Text>
        <Card style={styles.inputContainer}>
          <Text >Enter a number</Text>
          <Input 
            style={styles.input} 
            blurOnSubmit
            autoCapitalize='none' 
            autoCorrect={false} 
            maxLength={2} 
            keyboardType="number-pad"
            onChangeText={numberInputHandler}
            value={enteredValue}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button 
                title="Reset" 
                onPress={resetInputHandler} 
                color={Colors.accent} 
              />
            </View>
            <View style={styles.button}>
              <Button 
                title="Confirm"
                onPress={confirmInputHandler} 
                color={Colors.primary} 
              />
            </View>
          </View>
        </Card >
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
   );
}
 

const styles = StyleSheet.create({
  screen: {
    flex: 1, 
    alignItems: 'center', 
    padding: 10 
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  button: {
    width: 90
  },
  titleMargin: {
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  }, 
  input: {
    width: '50%',
    textAlign: 'center'
  },
  summaryContainer: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default StartGame;