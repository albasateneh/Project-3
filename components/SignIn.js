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
      
      AlertIOS.alert("Succesful sign in", "Please confirm your confirmation code below.", 
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
      <View style={styles.view}>
        <Image 
          source={require('../assets/images/candle.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>
          What's Lit!
        </Text>
        <View style={styles.container}>
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

        </View>
        
        <Text style={styles.copyright}>Copyright © 2019 What's Lit</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    height: 70,
    borderBottomWidth: 2,
    borderBottomColor: "#E0E0E0",
    margin: 16,
    color: '#E0E0E0'
  },
  view: {
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
  title: {
    color: "#E0E0E0",
    alignSelf: "center",
    fontFamily: "PartyLetPlain",
    fontWeight: "bold",
    fontSize: "40%",
    bottom: "5%",
    paddingBottom: "1%"
  },
  logo: {
    display: "block",
    position: "fixed",
    top: "1%",
    height: "18%",
    width: "25.5%",
    marginBottom: "20%",
    marginLeft: "auto",
    marginRight: "auto"
  },
  container: {
    bottom: "5%"
  }
});
