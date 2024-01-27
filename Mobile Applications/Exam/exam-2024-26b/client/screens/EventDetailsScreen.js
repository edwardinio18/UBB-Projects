import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Button} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import WebSocketClient from "../websocket/WebSocketClient";
import {useNavigation} from "@react-navigation/native";
import {appendLog} from "../log/Logger";

const EventDetailsScreen = ({route}) => {
    const navigation = useNavigation();
    const eventId = route.params.id;
    const [eventDetails, setEventDetails] = useState(null);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
            if (state.isConnected) {
                loadEventDetails();
            }

        });

        loadEventDetails();

        return () => unsubscribe();
    }, [eventId]);

    const handleWebSocketMessage = (data) => {
        try {
            const event = JSON.parse(data);
            Toast.show({
                type: 'info',
                text1: 'New Event Added',
                text2: `Event: ${event.name}`,
                visibilityTime: 5000,
                onPress: () => {
                    navigation.navigate('EventDetails', {id: event.id})
                },
            });
            appendLog('New event added');
        } catch (error) {
            appendLog('Error parsing WebSocket message');
        }
    };

    WebSocketClient(handleWebSocketMessage);

    const loadEventDetails = async () => {
        setIsLoading(true);
        const storedEventDetails = await getData(`@eventDetails_${eventId}`);

        if (isOffline) {
            if (storedEventDetails) {
                setEventDetails(storedEventDetails);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://172.30.111.235:2426/event/${eventId}`);
            const event = response.data;
            setEventDetails(event);
            await storeData(`@eventDetails_${eventId}`, event);
            setIsOffline(false);
            appendLog('Event details fetched successfully from server');
        } catch (error) {
            if (storedEventDetails) {
                setEventDetails(storedEventDetails);
                appendLog('Loaded event details from AsyncStorage');
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch event details.',
                    visibilityTime: 5000,
                });
                setIsOffline(true);
                appendLog('Error fetching event details');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem(key, jsonValue);
            appendLog('Storing data in AsyncStorage');
        } catch (e) {
            appendLog('Error storing data');
        }
    };

    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            appendLog('Retrieving data from AsyncStorage');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            appendLog('Error retrieving data');
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : isOffline && !eventDetails ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <Button title="Retry" onPress={loadEventDetails} color="#007AFF"/>
                </View>
            ) : eventDetails ? (
                <View>
                    <Text style={styles.eventTitle}>{eventDetails.name}</Text>
                    <Text style={styles.eventInfo}>{`ID: ${eventDetails.id}`}</Text>
                    <Text style={styles.eventInfo}>{`Team: ${eventDetails.team}`}</Text>
                    <Text style={styles.eventInfo}>{`Type: ${eventDetails.type}`}</Text>
                </View>
            ) : null}
            <Toast/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    offlineContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    offlineText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    eventTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    eventInfo: {
        fontSize: 18,
        marginBottom: 8,
    },
});

export default EventDetailsScreen;