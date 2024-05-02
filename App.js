import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from './components/image-viewer';
import Button from './components/button';
import { useState } from 'react';

export default function App() {
    const [selectedImgUri, setSelectedImgUri] = useState(null)

    const pickImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            setSelectedImgUri(result.assets[0].uri)
        } else {
            alert('Something went wrong. Please try again');
        }
    }

    return (
        <View style={styles.container}>
            <ImageViewer placeholderImageSource={require('./assets/images/background-image.png')} selectedImgUri={selectedImgUri} />
            <View style={styles.footerContainer}>
                <Button theme={'primary'} label={'Pick an image'} onPress={pickImageAsync} />
                <Button label={'Use this image'} />
            </View>
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'hsl(0, 0%, 20%)',
        alignItems: 'center',
    },
    footerContainer: {
        flex: 0.3,
        alignItems: 'center'
    }
});
