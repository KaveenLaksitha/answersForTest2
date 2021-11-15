import React, { useEffect } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'

const Logo = require('../assets/Logo.png')

// import logo from '../assets/Logo.png'

export default function SplashScreen({ navigation }) {

    useEffect(() => {

        setTimeout(() => {
            navigation.replace('Home')
        }, 2500);

    }, [])

    return (
        <View style={styles.container}>
            <View>
                {/* <Image/> */}
                <Image
                    style={styles.logo}
                    source={Logo}
                />
                <Text style={styles.logoText}>Bileeta Mobile</Text>
            </View>
        </View>
    )
}

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

