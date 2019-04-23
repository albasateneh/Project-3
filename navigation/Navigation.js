import React, {Component} from 'react';
import { AppRegistry, StyleSheet, View, Text } from 'react-native';
import MapScreen from '../screens/MapScreen';
import CameraPage from '../screens/Camera';
import ViewScreen from '../screens/ViewScreen'
import {createStackNavigator, createAppContainer} from 'react-navigation';



const NavStack = createStackNavigator ({
  Map: MapScreen,
  Camera: CameraPage,
  View: ViewScreen
  
})
const Container = createAppContainer(NavStack)

  
export default Container;
  

  

