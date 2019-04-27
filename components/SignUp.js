import React from 'react';
import { TextInput, Button, StyleSheet, Text, View, AlertIOS, Image } from 'react-native';
import Amplify, { Auth } from 'aws-amplify'

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    phone_number: '',
    email: '',
    confirmationCode: ''
  }

  signUp(){
    Auth.signUp({
      username: this.state.username,
      password: this.state.password,
      attributes: {
        phone_number: this.state.phone_number,
        email: this.state.email
      }
    })
    .then(() => {
      AlertIOS.alert("Successful sign up!", "Please enter the code sent to your phone below.", 
      [
        {
          text: 'Dismiss',
          style: "default"
        }
      ]);
      console.log('successful sign up!');
    })
    .catch(e => console.log('error signing up!: ', e))
  }

  confirmSignUp(){
    Auth.confirmSignUp(this.state.username, this.state.confirmationCode)
    .then(() => {
      AlertIOS.alert("Verified!", "Login to see What's Lit!", 
      [
        {
          text: 'Login',
          onPress: () => this.props.navigation.navigate('Login'),
          style: "default"
        }
      ]);
      console.log('success confirming sign up!')
    })
    .catch(e => console.log('error confirming signing up!: ', e))
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Image 
          source={require('../assets/images/candle.png')}
          style={styles.logo}
        />
        <TextInput 
          onChangeText={value => this.onChangeText('username', value)}
          style={styles.input}
          placeholder='Username'
          placeholderTextColor='#9E9E9E'
        />
        <TextInput 
          onChangeText={value => this.onChangeText('password', value)}
          style={styles.input}
          secureTextEntry={true}
          placeholder='Password'
          placeholderTextColor='#9E9E9E'
        />
        <TextInput 
          onChangeText={value => this.onChangeText('phone_number', value)}
          style={styles.input}
          placeholder='+1 (123)-456-7890'
          placeholderTextColor='#9E9E9E'
        />
        <TextInput 
          onChangeText={value => this.onChangeText('email', value)}
          style={styles.input}
          placeholder='Email'
          placeholderTextColor='#9E9E9E'
        />
        <Button 
          title='Sign-Up'
          onPress={this.signUp.bind(this)}
          color='#EF6C00'
        />
        <TextInput 
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          style={styles.input}
          placeholder='Enter 6-Digit Code'
          placeholderTextColor='#9E9E9E'
        />
        <Button 
          title='Verify'
          onPress={this.confirmSignUp.bind(this)}
          color='#EF6C00'
        />
        <Text style={styles.copyright}>Copyright © 2019 What's Lit</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
    margin: 15,
    color: "#E0E0E0"
  },
  container: {
    flex: 1,
    backgroundColor: '#424242',
    justifyContent: 'center',
  },
  copyright: {
    color: "#9E9E9E",
    textAlign: 'center',
    textDecorationLine: 'underline',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 1
  },
  logo: {
    display: "block",
    height: "18%",
    width: "25.5%",
    bottom: "1%",
    position: "fixed",
    marginLeft: "auto",
    marginRight: "auto"
  }
});
