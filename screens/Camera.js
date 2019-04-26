import React from 'react';
import { Alert, View, Text, Button } from 'react-native';
import { Camera, Permissions, Video, } from 'expo';
import * as firebase from 'firebase';
import styles from './camera/styles';
import Toolbar from './camera/toolbar.component';
import Gallery from './camera/gallery.component';
export default class CameraPage extends React.Component {
    
    static navigationOptions= ({navigation})=>({
        title: 'Camera',
        headerRight:<Button
        title=""
        onPress={()=>navigation.navigate('View')}
        />
    })
    
    camera = null;
    state = {
        captures: [],
        capturing: null,
        hasCameraPermission: null,
        cameraType: Camera.Constants.Type.back,
        flashMode: Camera.Constants.FlashMode.off
        };
    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });
    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };
    
    handleShortCapture = async () => {
        console.log("short")
        const { navigation } = this.props;
        const { navigate } = navigation;
        const photoData = await this.camera.takePictureAsync();
        console.log(photoData.uri);
        Alert.alert(
            'Done!',
            'Would you like to Post?',
            [
                {
                    text: 'Retake',
                    onPress: () => {
                        {/*navigate('View')*/}
                        this.setState({captures : [], capturing: true});
                    },
                    style: 'cancel',
              },
              {
                  text: 'Post', onPress: () => {
                    {/*navigate('View')*/}
                    if(!photoData.cancelled) {
                        this.uploadImage(photoData.uri, "lit_pics" )
                        .then(() => {(console.log('success'))
                        })
                        .catch((error) => {
                            console.log(error);
                        })
                    }
                }
                },
            ],
            {cancelable: true},
          );        
          this.setState({ capturing: false, captures: [photoData, ...this.state.captures]})
          
    };
    uploadImage = async (uri, imageName) => {
        const response = await fetch(uri);
        //console.log(response);
        const blob = await response.blob();
        var ref = firebase.storage().ref().child("images/" + imageName);
        return ref.put(blob);
    }
    handleLongCapture = async () => {
        console.log("lel")
        const videoData = await this.camera.recordAsync();
        console.log("uber lel")
        console.log(videoData)
        Alert.alert(
            'Done!',
            'Would you like to Post?',
            [
              {
                text: 'Retake',
                onPress: () => {
                    {/*navigate('View')*/}
                    this.setState({captures : [], capturing: true});
                },
                style: 'cancel',
              },
              {text: 'Post', onPress: () => this.setState({captures : [], capturing: true})},
            ],
            {cancelable: true},
          );        
        this.setState({ 
            capturing: false,
            captures: [videoData, ...this.state.captures]
        });
    };
    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
        this.setState({ hasCameraPermission });
    };
    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }
        return (
            <React.Fragment>
                <View>
                    <Camera
                        type={cameraType}
                        flashMode={flashMode}
                        style={styles.preview}
                        ref={camera => this.camera = camera}
                    />
                </View>
                {captures.length > 0 && <Gallery captures={captures} />}
                <Toolbar
                    capturing={capturing}
                    flashMode={flashMode}
                    cameraType={cameraType}
                    setFlashMode={this.setFlashMode}
                    setCameraType={this.setCameraType}
                    onCaptureIn={this.handleCaptureIn}
                    onCaptureOut={this.handleCaptureOut}
                    onLongCapture={this.handleLongCapture}
                    onShortCapture={this.handleShortCapture}
                />
                
            </React.Fragment>
        );
    };
};