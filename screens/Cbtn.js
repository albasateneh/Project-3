import React from 'react';
import {View, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {Icon} from 'react-native-elements'

export default class ViewScreen extends React.Component {
    static navigationOptions= ({navigation})=>({
        title: 'Camera',
        headerRight:<Button
        title="View Posts"
        onPress={()=>navigation.navigate('View')}
        />
    })

  render() {
      
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
        
    <TouchableOpacity style={styles.cameraIcon}>
        <Icon
            reverse
            name={'camera'}
            type={'feather'}
            color={'#FF5733'}
            onPress={() => this.props.navigation.navigate('Camera')}/>
    </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  cameraIcon: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 36,
    alignItems: 'center'

  }

});