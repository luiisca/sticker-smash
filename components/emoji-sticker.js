import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

export default function EmojiSticker({ imageSize, stickerSource }) {
    // shared values
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const scaleImageSize = useSharedValue(imageSize);

    // styles
    const containerStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }]
    }))
    const scaleStyle = useAnimatedStyle(() => ({
        width: withSpring(scaleImageSize.value),
        height: withSpring(scaleImageSize.value)
    }))

    // gestures
    const drag = Gesture.Pan().onChange((event) => {
        translateX.value += event.changeX;
        translateY.value += event.changeY;
    })
    const doubleTap = Gesture.Tap().numberOfTaps(2).onStart(() => {
        if (scaleImageSize.value !== imageSize * 2) {
            scaleImageSize.value = imageSize * 2
        } else {
            scaleImageSize.value = imageSize
        }
    })
    const composedGesture = Gesture.Simultaneous(drag, doubleTap)

    return (
        <GestureDetector gesture={composedGesture}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <Animated.Image
                    source={stickerSource}
                    resizeMode="contain"
                    style={scaleStyle}
                />
            </Animated.View>
        </GestureDetector>
    )
}
