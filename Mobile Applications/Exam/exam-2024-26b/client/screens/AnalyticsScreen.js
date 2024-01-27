import React, {useEffect, useState} from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    StatusBar,
    Platform
} from 'react-native';
import axios from 'axios';
import {appendLog} from "../log/Logger";

const AnalyticsScreen = () => {
    const [topEvents, setTopEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadTopEvents();
    }, []);

    const loadTopEvents = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://172.30.111.235:2426/allEvents');
            const top5Events = response.data.slice(0, 5);

            const sortedTopEvents = top5Events.sort((a, b) => {
                if (a.status < b.status) return -1;
                if (a.status > b.status) return 1;
                return b.participants - a.participants;
            });

            setTopEvents(sortedTopEvents);
            appendLog('Fetched top events successfully');
        } catch (error) {
            appendLog('Error fetching top events');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : topEvents.length === 0 ? (
                <Text style={styles.noEventsText}>No top events available.</Text>
            ) : (
                <>
                    <Text style={styles.sectionTitle}>Top 5 Events by Participants</Text>
                    <FlatList
                        data={topEvents}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({item}) => (
                            <View style={styles.eventItem}>
                                <Text style={styles.eventTitle}>Event Name: {item.name}</Text>
                                <Text>Status: {item.status}</Text>
                                <Text>Participants: {item.participants}</Text>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: '#f2f2f2',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        paddingLeft: 10,
    },
    eventItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5,
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    noEventsText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default AnalyticsScreen;