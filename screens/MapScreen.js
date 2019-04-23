import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { SearchBar, Icon } from 'react-native-elements';
import axios from 'axios';
import CameraPage from './Camera'

/* var googleMapsClient = require('react-native-google-maps-services').createClient({
  key: 'AIzaSyArlF_dWAiCAliK_BkP7yAgeqgtUcRMcW8'
});

googleMapsClient.geocode({
  address: 'moscow russia'
}, function(err, response) {
  if (!err) {
    this.setState({
      lat: response.json.results[0].geometry.location.lat,
      lng: response.json.results[0].geometry.location.lng
    })
  }
});*/


class MapScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      locationInput: '',
      locationCoordinates: {
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };

    this.handleLocationInput = this.handleLocationInput.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
  }



  handleLocationInput(textInput) {
    this.setState({
      locationInput: textInput
    });
  }

  updateLocationCoordinates(response) {
    var info = response.data.results[0].geometry.location;
    this.setState({
      locationCoordinates: {
        latitude: info.lat,
        longitude: info.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    })
  }

  handleSubmit(textInput) {
    axios.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + this.state.locationInput.split(' ').join('') + "&key=" + 'AIzaSyArlF_dWAiCAliK_BkP7yAgeqgtUcRMcW8')
      .then(response => this.updateLocationCoordinates(response))
      .catch(err => console.log(err))
  }


  handleLocationChange(response) {
    this.setState({
      locationCoordinates: response
    })
  }


  render() {
    return (
      <View style={styles.container}>

        <SearchBar style={{borderTopWidth: 10}}
        round
          placeholder="What's Lit?"
          onChangeText={this.handleLocationInput}
          value={this.state.locationInput}
          onSubmitEditing={this.handleSubmit.bind(this)}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          
          style={{ flex: 1 }}
          customMapStyle={mapStyle}
          region={this.state.locationCoordinates}

        >
        {/*<TouchableOpacity style={styles.cameraIcon}
        >
        <Icon
            reverse
            name={'camera'}
            type={'feather'}
            color={'#FF5733'}/>
    </TouchableOpacity>*/}
          

          <MapView.Marker
            coordinate={this.state.locationCoordinates}
            description=""
            image={require('./Images/Fire-512.png')}
            onPress={() => this.props.navigation.navigate('View')}
          >




          </MapView.Marker>

        </MapView>




        {/*  <Text>
          Location: {this.state.locationResult}
        </Text>*/}

      </View>
    );
  }
}
const mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]
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

export default MapScreen;

