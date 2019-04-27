import React from 'react';
import { TextInput, Button, StyleSheet, Text, View, AlertIOS, Image} from 'react-native';
import { Auth } from 'aws-amplify';

export default class App extends React.Component {
  state = {
    username: '',
    password: '',
    confirmationCode: '',
    user: {}
  }

  signIn(){
    const { username, password } = this.state
    Auth.signIn(username, password)
    .then((user) => {
      this.setState({ user });
      AlertIOS.alert("Succesful sign in!", "Please confirm your confirmation code below.", 
      [
        {
          text: 'Dismiss',
          style: "default"
        }
      ]);
      console.log('successful sign in!')
    })
      .catch(e => console.log('error signing in!: ', e))
  }

  confirmSignIn(){
    Auth.confirmSignIn(this.state.user, this.state.confirmationCode)
    .then(() => {
        console.log('success confirming sign in!')
        this.props.screenProps.authenticate(true)
})
    .catch(e => console.log('error confirming signing in!: ', e))
  }

  onChangeText(key, value) {
    this.setState({
      [key]: value
    })
  }
  
  render() {
    return (
      <View style={styles.container}>
        {/* <Image 
          source={require('../assets/images/WhatsLitLogo.png')}
        /> */}
        <TextInput 
          onChangeText={value => this.onChangeText('username', value)}
          placeholder='Username'
          placeholderTextColor='#9E9E9E'
          style={styles.input}
        />
        <TextInput 
          onChangeText={value => this.onChangeText('password', value)}
          secureTextEntry={true}
          placeholder='Password'
          placeholderTextColor='#9E9E9E'
          style={styles.input}
        />
        <Button 
          title='Sign-In'
          onPress={this.signIn.bind(this)}
          color='#EF6C00'
        />
        <TextInput 
          onChangeText={value => this.onChangeText('confirmationCode', value)}
          placeholder='Enter 6-Digit Code'
          placeholderTextColor='#9E9E9E'
          style={styles.input}
        />
        <Button 
          title='Confirm'
          onPress={this.confirmSignIn.bind(this)}
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
    margin: 10,
    color: '#E0E0E0'
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

  },
  button: {
    color:'#EF6C00'
  }
});
