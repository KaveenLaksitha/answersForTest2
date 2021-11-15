import React, { useState } from 'react'
import { Modal, StyleSheet, View, Text, TouchableHighlight, Dimensions, Image } from 'react-native'

const windowWidth = Dimensions.get('window').width;

const ViewSingleUser = (props) => {

    const [modalVisible, setModalVisible] = useState(props.visible);

    const closeModal = (bool) => {
        props.changeModalVisibility(bool)
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(false);
            }}
        >
            <View style={styles.centeredView}>

                <View style={styles.cutTop} />

                <View style={styles.modalView}>
                    <View style={styles.topEdge} />
                    <View style={styles.bottomEdge} />
                    <View style={styles.horizontal}>
                        <Image
                            style={styles.userImage}
                            source={{ uri: `${props.data.avatar}` }}
                        />
                        <View style={styles.vertical}>
                            <Text style={styles.textTitle}>First Name: <Text style={styles.text}>{props.data.first_name}</Text></Text>
                            <Text style={styles.textTitle}>Last Name: <Text style={styles.text}>{props.data.last_name}</Text></Text>
                            <Text style={styles.textTitle}>Email: <Text style={styles.text}>{props.data.email}</Text></Text>
                        </View>

                    </View>
                    <TouchableHighlight
                        onPress={() => closeModal(false)}
                        underlayColor="#823aa8">
                        <View
                            style={styles.btnClose}>
                            <Text style={styles.textStyle}>Close</Text>
                            <View style={styles.btnEdge} />
                        </View>
                    </TouchableHighlight>
                </View>

                <View style={styles.cutBottom} />
            </View>
        </Modal >
    )
}

const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    cutTop: {
        position: "relative",
        width: windowWidth - 30,
        borderLeftColor: "transparent",
        borderLeftWidth: 25,
        borderBottomColor: "white",
        borderBottomWidth: 25,
        borderTopRightRadius: 10
    },
    cutBottom: {
        position: "relative",
        width: windowWidth - 30,
        borderTopWidth: 25,
        borderRightColor: "transparent",
        borderRightWidth: 25,
        borderTopColor: "white",
        borderBottomLeftRadius: 10
    },
    modalView: {
        width: windowWidth - 30,
        backgroundColor: "white",
        padding: 0,
        alignItems: "center",
    },
    btnClose: {
        width: 100,
        height: 40,
        backgroundColor: "#52007a",
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 15
    },
    btnEdge: {
        position: "absolute",
        bottom: 0,
        right: 0,
        borderBottomWidth: 10,
        borderBottomColor: "white",
        borderLeftWidth: 10,
        borderLeftColor: "transparent",
    },
    textStyle: {
        color: "white",
        fontSize: 18,
    },

    textTitle: {
        marginBottom: 15,
        fontSize: 16,
        fontWeight: "bold"
    },
    text: {
        fontSize: 16,
        fontWeight: "normal"
    },
    userImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 10
    },
    vertical: {
        flexDirection: "column",
    },
    horizontal: {
        flexDirection: "row",
        alignItems: "center"
    }
})

export { ViewSingleUser }