import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from './components/image-viewer';
import Button from './components/button';
import { useState } from 'react';
import IconButton from './components/icon-button';
import CircleButton from './components/circle-button';
import EmojiPicker from './components/emoji-picker';
import EmojiList from './components/emoji-list';
import EmojiSticker from './components/emoji-sticker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
    const [selectedImgUri, setSelectedImgUri] = useState(null)
    const [showOptions, setShowOptions] = useState(false)
    const [showEmojiPickerModal, setShowEmojiPickerModal] = useState(false)
    const [pickedEmoji, setPickedEmoji] = useState(null)

    const pickImageAsync = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            setSelectedImgUri(result.assets[0].uri)
            setShowOptions(true)
        } else {
            alert('Something went wrong. Please try again');
        }
    }
    const onReset = () => {
        setShowOptions(false)
    }
    const onCloseEmojiPickerModal = () => {
        setShowEmojiPickerModal(false)
    }
    const onAddSticker = () => {
        setShowEmojiPickerModal(true)
    }
    const onSaveImageAsync = async () => {
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer placeholderImageSource={require('./assets/images/background-image.png')} selectedImgUri={selectedImgUri} />
                {pickedEmoji && <EmojiSticker imageSize={80} stickerSource={pickedEmoji} />}
            </View>
            <EmojiPicker isVisible={showEmojiPickerModal} onClose={onCloseEmojiPickerModal}>
                <EmojiList closeModal={onCloseEmojiPickerModal} onSelect={setPickedEmoji} />
            </EmojiPicker>
            {showOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon={'refresh'} label={'Reset'} onPress={onReset} />
                        <CircleButton onPress={onAddSticker} />
                        <IconButton icon={'save-alt'} label={'Save'} onPress={onSaveImageAsync} />
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button theme={'primary'} label={'Pick an image'} onPress={pickImageAsync} />
                    <Button label={'Use this image'} onPress={() => setShowOptions(true)} />
                </View>
            )}
            <StatusBar style="auto" />
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'hsl(0, 0%, 20%)',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        paddingTop: 58,
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    footerContainer: {
        flex: 0.3,
        alignItems: 'center'
    }
});
