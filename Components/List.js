import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, SafeAreaView, StatusBar, StyleSheet, Modal, Text, TextInput, TouchableHighlight, View, Dimensions } from 'react-native'

import AsyncStorage from '@react-native-async-storage/async-storage';
import { ViewSingleUser } from './modals/ViewSingleUser';

const windowWidth = Dimensions.get('window').width;


export default function List() {

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [modalData, setModalData] = useState([])
    const [modalVisible, setModalVisible] = useState(false);

    const [text, onChangeText] = useState("");


    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await fetch('https://reqres.in/api/users?page=2');
            const json = await response.json();

            if (Object.keys(json.data).length != 0) {

                setData(json.data);
                setFilteredData(json.data);
                AsyncStorage.clear();
                await AsyncStorage.setItem('USERS', JSON.stringify(json.data))
                    .then(() => {
                        console.log('saved successfully')
                    })
                    .catch(() => {
                        console.log('error when saving')
                    })
            } else {
                let values
                try {
                    values = await AsyncStorage.getItem('USERS')
                    setFilteredData(JSON.parse(values))
                } catch (e) {
                    console.log("error while fetching data")
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const searchById = async () => {
        if (text === '' || !text) {
            setFilteredData(data)
        } else {
            try {
                const response = await fetch(`https://reqres.in/api/users/${text}`);
                const json = await response.json();
                if (Object.keys(json.data).length != 0) {
                    setFilteredData([json.data])
                }
            } catch (error) {
                console.log("error while fetching data")
            } finally {
                setLoading(false);
            }
        }

    }

    const openModal = (user) => {
        setModalData(user)
        changeModalVisibility(true)
    }

    const changeModalVisibility = (state) => {
        setModalVisible(state)
    }


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#52007a" />

            <View style={styles.searchField}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder={"User ID"}
                />
                <TouchableHighlight onPress={() => { searchById() }} underlayColor="none">
                    <View style={styles.button}>
                        <Text style={styles.btnText}>Search</Text>
                        <View style={styles.btnEdge} />
                    </View>
                </TouchableHighlight>
            </View>

            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>AVAILABLE USERS</Text>
                {isLoading ? <ActivityIndicator /> : (

                    <FlatList
                        data={filteredData}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <TouchableHighlight onPress={() => { openModal(item) }} underlayColor='none'>
                                <View style={styles.listItem} >
                                    <Text style={styles.textSize}>ID: {item.id}</Text>
                                    <Text style={styles.textSize}>Name: {item.first_name}</Text>
                                </View>
                            </TouchableHighlight>
                        )}
                    />
                )}
            </View>


            <Modal
                animationType="slide"
                transparent={true}
                onHide={() => setModalVisible(false)}
                visible={modalVisible}
            >
                <ViewSingleUser data={modalData} changeModalVisibility={changeModalVisibility} />

            </Modal>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    searchField: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 20
    },
    listTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 20
    },
    listContainer: {
        flex: 1,
        backgroundColor: "#f2f2f2",
        padding: 15
    },
    input: {
        fontSize: 18,
        height: 40,
        width: windowWidth - 180,
        borderWidth: 0,
        backgroundColor: "#f2f2f2",
        padding: 10,
    },
    button: {
        width: 120,
        height: 38,
        backgroundColor: "#52007a",
        justifyContent: "center",
        alignItems: "center",
        // borderBottomRightRadius: 15,
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
    btnText: {
        color: "white",
        fontSize: 18,
    },
    listItem: {
        justifyContent: "center",
        backgroundColor: "white",
        width: windowWidth - 10,
        padding: 15,
        marginBottom: 20
    },
    textSize: {
        fontSize: 18
    }
})
