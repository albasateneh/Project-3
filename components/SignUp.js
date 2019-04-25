import React from 'react';
import { TextInput, Button, StyleSheet, Text, View } from 'react-native';
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
    .then(() => console.log('successful sign up!'))
    .catch(e => console.log('error signing up!: ', e))
  }

  confirmSignUp(){
    Auth.confirmSignUp(this.state.username, this.state.confirmationCode)
    .then(() => console.log('success confirming sign up!'))
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
        title='Confirm'
        onPress={this.confirmSignUp.bind(this)}
        color='#EF6C00'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
    margin: 10,
    color: "#E0E0E0"
  },
  container: {
    flex: 1,
    backgroundColor: '#424242',
    justifyContent: 'center',
  },
});
