import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Container from './navigation/Navigation'
export default class App extends React.Component {
  render() {
    return (
  
      <Container />
    );
  }
}


  

  

  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
});

