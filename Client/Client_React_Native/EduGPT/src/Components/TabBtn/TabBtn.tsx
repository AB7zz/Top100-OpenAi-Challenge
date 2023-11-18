import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { homeIconActive } from '../../Constants/constants'

const TabBtn = ({ text, onPress }) => {
    return (
        <View style={{ height: 74, justifyContent: "center", alignItems: "center" }}>
            <TouchableOpacity
                key={text}
                accessibilityRole="button"
                onPress={onPress}
                style={styles.btnCont}
            >
                <Image source={homeIconActive} />
                <Text style={[styles.btnText]}>
                    {text}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default TabBtn

const styles = StyleSheet.create({
    cont: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "white",
        alignItems: "center",
        // height:84,
        elevation: 1,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingBottom: 8
    },
    btnCont: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 18
    },
    btnText: {
        margin: 6,
    }
})