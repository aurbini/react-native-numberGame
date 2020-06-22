import React from 'react';
import { View, StyleSheet, Text } from 'react-native'
import Colors from '../constants/colors'

const Header = (props) => {
  return ( 
    <View style={styles.Header}> 
      <Text style={styles.HeaderTitle}> { props.title} </Text>
    </View>
   );
}
 
export default Header;

const styles = StyleSheet.create({
  Header: {
    width: '100%', 
    height: 90, 
    paddingTop: 36, 
    backgroundColor: Colors.primary, 
    alignItems: 'center', 
    justifyContent: 'center'
  }, 
  HeaderTitle: {
    color: 'black', 
    fontSize: 30
  }
})