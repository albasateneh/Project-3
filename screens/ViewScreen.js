import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native'
import {Icon} from 'react-native-elements'
export default class ViewScreen extends React.Component {

  static navigationOptions= ({navigation})=>({
    title: 'Posts',
    headerRight:<Button
    title="Camera"
    name={'camera'}
    onPress={() => navigation.navigate('Camera')}/>

})
  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    <Text></Text>
      );
  }
}

