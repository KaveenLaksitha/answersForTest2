import React, { useEffect } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const Logo = require('../assets/Logo.png')


export default function SplashScreen({ navigation }) {

    //set timeout to display splash screen
    useEffect(() => {

        setTimeout(() => {
            navigation.replace('Home')
        }, 2500);

    }, [])

    return (
        <View style={styles.container}>
            <View>
                <Image
                    style={styles.logo}
                    source={Logo}
                />
                <Text style={styles.logoText}>Bileeta Mobile</Text>
            </View>
        </View>
    )
}

//styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    logo: {
        height: 300,
        width: 250,
        resizeMode: 'contain',
    },
    logoText: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 36
    }
})
