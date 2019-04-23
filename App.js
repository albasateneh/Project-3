import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Amplify, { Auth } from 'aws-amplify'
import awsmobile from './aws-exports'
Amplify.configure(awsmobile)
import Tabs from './components/Tabs'
import Container from './navigation/Navigation'

export default class App extends React.Component {
  state = {
    isAuthenticated: false
  }
  authenticate(isAuthenticated){
    this.setState({
      isAuthenticated
    })
  }
  render() {
    if (this.state.isAuthenticated) {
      console.log("Auth: ", Auth)
      return(
        // <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
        //   <Text>Hello {Auth.user.username}!</Text>
        // </View>
        <Container />
      )
    }
    return (
      <View style={styles.container}>
        <Tabs 
        screenProps={{
          authenticate: this.authenticate.bind(this)
        }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#424242',
  },
});

