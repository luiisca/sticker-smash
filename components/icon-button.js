import { MaterialIcons } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text } from "react-native";

export default function IconButton({ label, icon, ...props }) {
    return (
        <Pressable
            style={styles.iconButton}
            {...props}
        >
            <MaterialIcons
                name={icon}
                size={24}
                color="white"
            />
            <Text style={styles.iconButtonLabel}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    iconButton: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconButtonLabel: {
        color: 'white',
        marginTop: 12,
    }
})
