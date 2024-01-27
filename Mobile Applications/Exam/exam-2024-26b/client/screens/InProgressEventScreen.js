import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity} from 'react-native';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import Toast from "react-native-toast-message";
import {appendLog} from "../log/Logger";

const InProgressEventScreen = () => {
    const navigation = useNavigation();
    const [inProgressEvents, setInProgressEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadInProgressEvents();
    }, []);

    const loadInProgressEvents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://172.30.111.235:2426/inProgress');
            setInProgressEvents(response.data);
            appendLog('Fetched in progress events successfully');
        } catch (error) {
            appendLog('Error fetching in progress events');
        } finally {
            setIsLoading(false);
        }
    };

    const enrollInEvent = async (eventId) => {
        try {
            await axios.put(`http://172.30.111.235:2426/enroll/${eventId}`);
            Toast.show({
                type: 'success',
                text1: 'Enrolled in the event',
                text2: `Event ID: ${eventId}`,
                visibilityTime: 5000,
            });

            appendLog('Enrolled in the event successfully');
        } catch (error) {
            appendLog('Error enrolling in the event');
        }
    };

    const filteredEvents = inProgressEvents.filter((event) => event.status === 'in progress');

    const sortedEvents = filteredEvents.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <FlatList
                    data={sortedEvents}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.eventItem}
                            onPress={() => {
                                navigation.navigate('EventDetails', {id: item.id});
                            }}
                        >
                            <Text style={styles.title}>{item.name}</Text>
                            <Text>Team: {item.team}</Text>
                            <Text>Type: {item.type}</Text>
                            <TouchableOpacity
                                style={styles.enrollButton}
                                onPress={() => {
                                    enrollInEvent(item.id);
                                }}
                            >
                                <Text style={styles.enrollButtonText}>Enroll</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                />
            )}
            <Toast/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2f2f2',
        padding: 10,
    },
    eventItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    enrollButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    enrollButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default InProgressEventScreen;