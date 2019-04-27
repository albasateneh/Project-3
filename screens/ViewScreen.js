import React from 'react';
import {Text, View, StyleSheet, Button} from 'react-native'
import {Icon} from 'react-native-elements'
import * as firebase from 'firebase';
import Gallery from './camera/gallery.component';
import FbKey from '../constants/FbKey'
firebase.initializeApp(FbKey.FirebaseConfig);

var storage = firebase.storage().ref('images/lit_pics');
var pix = storage.getDownloadURL().then(function(url) {
var dank = url
console.log("asdasdsad" + dank)
})
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
      <View>
<Text></Text>
</View>     );
  }
}




