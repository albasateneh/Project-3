import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants, MapView, Location, Permissions } from 'expo';
import SearchBar from './searchbar'

var googleMapsClient = require('react-native-google-maps-services').createClient({
  key: 'AIzaSyArlF_dWAiCAliK_BkP7yAgeqgtUcRMcW8'
});

googleMapsClient.geocode({
  address: 'moscow russia'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results[0].geometry.location);
    this.setState({
      lat: response.json.results[0].geometry.location.lat,
      lng: response.json.results[0].geometry.location.lng
    })
  }
});


export default class App extends Component {
  state = {
    mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    locationResult: null,
    location: {coords: { latitude: 37.78825, longitude: -122.4324}},
  };

   

  render() {
    return (
      <View style={styles.container}>
      <SearchBar />
        <MapView
          style={{ flex: 1}}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onRegionChange={this._handleMapRegionChange}
        >
    <MapView.Marker
      coordinate={this.state.location.coords}
      title="It's Lit Bruhhhh"
      description="DEEEEEEETTSSSSS BRUUUHHHHH"
    />
        </MapView>
        

       {/*  <Text>
          Location: {this.state.locationResult}
        </Text>*/}
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
 
});
