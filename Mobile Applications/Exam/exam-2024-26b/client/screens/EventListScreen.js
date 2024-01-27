import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-toast-message';
import WebSocketClient from "../websocket/WebSocketClient";
import {appendLog} from "../log/Logger";

const EventListScreen = () => {
        const navigation = useNavigation();
        const [eventData, setEventData] = useState([]);
        const [isOffline, setIsOffline] = useState(false);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            const unsubscribe = NetInfo.addEventListener(state => {
                setIsOffline(!state.isConnected);
            });

            loadData();

            return () => unsubscribe();
        }, []);

        const clearAllData = async () => {
            try {
                await AsyncStorage.clear();
                appendLog('All data cleared');
            } catch (e) {
                appendLog('Error clearing all data');
            }
        };

        const showAllAsyncStorageData = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const result = await AsyncStorage.multiGet(keys);

                appendLog('All keys and items in AsyncStorage:');
                result.forEach(([key, value]) => {
                    appendLog(`${key}: ${value}`);
                });
            } catch (error) {
                appendLog('Error retrieving data from AsyncStorage');
            }
        };

        // clearAllData();
        showAllAsyncStorageData();

        const handleWebSocketMessage = (data) => {
            try {
                const event = JSON.parse(data);
                setEventData((prevEvents) => [...prevEvents, event]);
                Toast.show({
                    type: 'info',
                    text1: 'New Event Added',
                    text2: `Event: ${event.name}`,
                    visibilityTime: 5000,
                    onPress: () => {
                        navigation.navigate('EventDetails', {id: event.id})
                    },
                });
            } catch (error) {
                appendLog('Error parsing WebSocket message');
            }
        };

        WebSocketClient(handleWebSocketMessage);

        const storeEventData = async (data) => {
            try {
                const jsonValue = JSON.stringify(data);
                await AsyncStorage.setItem('@eventData', jsonValue);
            } catch (error) {
                appendLog('Error storing event data');
            }
        };

        const loadEventDataFromStorage = async () => {
            try {
                const jsonValue = await AsyncStorage.getItem('@eventData');
                return jsonValue ? JSON.parse(jsonValue) : [];
            } catch (error) {
                appendLog('Error retrieving event data from storage');
                return [];
            }
        };

        const loadData = async () => {
            setIsLoading(true);

            if (isOffline) {
                const storedEventData = await loadEventDataFromStorage();
                setEventData(storedEventData);
                setIsLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://172.30.111.235:2426/events');
                const events = response.data;
                setEventData(events);
                storeEventData(events);
                appendLog('Event data fetched successfully from server');
            } catch (error) {
                appendLog('Error fetching event data');
                const storedEventData = await loadEventDataFromStorage();
                setEventData(storedEventData);

                if (storedEventData.length === 0) {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: 'Failed to fetch event data.',
                        visibilityTime: 5000,
                    });
                }
            } finally {
                setIsLoading(false);
            }
        };

        return (
            <View style={styles.container}>
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : isOffline && eventData.length === 0 ? (
                    <View style={styles.offlineContainer}>
                        <Text style={styles.offlineText}>You are offline</Text>
                        <Button title="Retry" onPress={loadData} color="#007AFF"/>
                    </View>
                ) : (
                    <>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.progressButton, isOffline && styles.disabledButton]}
                                onPress={() => navigation.navigate('InProgressEvent')}
                                disabled={isOffline}
                            >
                                <Text style={[styles.progressButtonText, isOffline && styles.disabledButtonText]}>In
                                    Progress
                                    Events</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={[styles.progressButton, isOffline && styles.disabledButton]}
                                onPress={() => navigation.navigate('Analytics')}
                                disabled={isOffline}
                            >
                                <Text
                                    style={[styles.progressButtonText, isOffline && styles.disabledButtonText]}>Analytics</Text>
                            </TouchableOpacity>
                        </View>

                        <FlatList
                            data={eventData}
                            keyExtractor={(item) => item.id.toString()}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item}) => (
                                <TouchableOpacity
                                    style={styles.itemContainer}
                                    onPress={() => navigation.navigate('EventDetails', {id: item.id})}
                                >
                                    < Text style={styles.itemText}>{`ID: ${item.id}`}</Text>
                                    <Text style={styles.itemText}>{`Name: ${item.name}`}</Text>
                                    <Text style={styles.itemText}>{`Team: ${item.team}`}</Text>
                                    <Text style={styles.itemText}>{`Type: ${item.type}`}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <TouchableOpacity
                            style={[styles.addButton, isOffline && styles.disabledButton]}
                            onPress={() => navigation.navigate('CreateEvent')}
                            disabled={isOffline}
                        >
                            <Text style={[styles.addButtonText, isOffline && styles.disabledButtonText]}>Add New
                                Event</Text>
                        </TouchableOpacity>
                    </>
                )
                }
                <Toast/>
            </View>
        )
            ;
    }
;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
    offlineContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    offlineText: {
        fontSize: 18,
        marginBottom: 10,
    },
    itemContainer: {
        backgroundColor: '#007AFF',
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
    },
    itemText: {
        color: '#fff',
        fontSize: 16,
    },
    progressButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        marginHorizontal: 8,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#999',
        opacity: 0.7,
    },
    disabledButtonText: {
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        margin: 16,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 50,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
});

export default EventListScreen;