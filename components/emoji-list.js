import { useState } from "react";
import { FlatList, Image, Platform, Pressable, StyleSheet } from "react-native";

export default function EmojiList({ onSelect, closeModal }) {
    const [emojies] = useState([
        require('../assets/images/emoji1.png'),
        require('../assets/images/emoji2.png'),
        require('../assets/images/emoji3.png'),
        require('../assets/images/emoji4.png'),
        require('../assets/images/emoji5.png'),
        require('../assets/images/emoji6.png'),
    ]);

    return (
        <FlatList
            horizontal
            showsHorizontalScrollIndicator={Platform.OS === 'web'}
            data={emojies}
            contentContainerStyle={styles.emojiListContainer}
            renderItem={({ item, index }) => (
                <Pressable onPress={() => {
                    onSelect(item)
                    closeModal()
                }}>
                    <Image source={item} key={index} style={styles.emoji} />
                </Pressable>
            )}
        />
    )
}

const styles = StyleSheet.create({
    emojiListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    emoji: {
        width: 100,
        height: 100,
        marginRight: 20,
    },
})
