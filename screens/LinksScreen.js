import React from 'react';
import { MapView } from 'expo';
var googleMapsClient = require('react-native-google-maps-services').createClient({
  key: 'AIzaSyArlF_dWAiCAliK_BkP7yAgeqgtUcRMcW8'
});
// Geocode an address.
googleMapsClient.geocode({
  address: 'UCI'
}, function(err, response) {
  if (!err) {
    console.log(response.json.results);
    this.setState({
      lat: response.json.results.location.lat,
      lng: response.json.results.location.lng
    })
  }
});
export default class Map extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 37.78825,
      lng: -122.4324
    }
  }
  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: this.state.lat,
          longitude: this.state.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}
