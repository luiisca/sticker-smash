import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import ImageViewer from './components/image-viewer';
import Button from './components/button';

export default function App() {
    return (
        <View style={styles.container}>
            <ImageViewer placeholderImageSource={require('./assets/images/background-image.png')} />
            <View style={styles.footerContainer}>
                <Button theme={'primary'} label={'Pick an image'} />
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
