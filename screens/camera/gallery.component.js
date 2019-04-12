import React from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Video } from 'expo'
import styles from './styles';
function isMovie(uri) {
    const ext = uri.split(".")[1]
    return ext === 'mov' || ext === 'mp4' || ext === 'avi'
}
export default ({ captures = [] }) => (
    <ScrollView
        horizontal={true}
        style={[styles.bottomToolbar, styles.galleryContainer]}
    >
        {captures.map(({ uri }) => (
            <View style={styles.galleryImageContainer} key={uri}>
                {
                    isMovie(uri) ?
                        <Video
                            source={{uri}}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="cover"
                            shouldPlay
                            isLooping
                            style={styles.galleryImage}
                        />
                        : <Image source={{ uri }} style={styles.galleryImage} />
                }
            </View>
        ))}
    </ScrollView>
);