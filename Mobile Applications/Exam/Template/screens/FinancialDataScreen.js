import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import WebSocketClient from "../websocket/WebSocketClient";

const FinancialDataScreen = () => {
    const navigation = useNavigation();
    const [financialData, setFinancialData] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        const clearAllData = async () => {
            try {
                await AsyncStorage.clear();
                appendLog('All data cleared');
            } catch (e) {
                appendLog('Error clearing all data', e);
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
                appendLog('Error retrieving data from AsyncStorage:', error);
            }
        };

        clearAllData();
        // showAllAsyncStorageData();

        loadData();

        return () => unsubscribe();
    }, []);

    const handleWebSocketMessage = (data) => {
        try {
            const transaction = JSON.parse(data);
            Toast.show({
                type: 'info',
                text1: 'New Transaction Added',
                text2: `Transaction: ${transaction.type}`,
                visibilityTime: 5000,
                onPress: () => {
                    navigation.navigate('FinancialDetails', {date: transaction.date})
                },
            });
        } catch (error) {
            console.error('Error parsing WebSocket message', error);
        }
    };

    WebSocketClient(handleWebSocketMessage);

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value);
            await AsyncStorage.setItem('@financialData', jsonValue);
        } catch (e) {
            console.error(`Error storing financial data`, e);
        }
    };

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@financialData');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            console.error(`Error retrieving financial data`, e);
        }
    };

    const loadData = async () => {
        setIsLoading(true);
        const storedData = await getData();

        if (isOffline) {
            if (storedData) {
                setFinancialData(storedData);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get('http://192.168.0.17:2307/days');
            setFinancialData(response.data);
            storeData(response.data);
        } catch (error) {
            console.error('Error fetching financial data:', error);
            if (storedData) {
                setFinancialData(storedData);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch financial data.',
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
            ) : isOffline && !financialData.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <Button title="Retry" onPress={loadData} color="#007AFF"/>
                </View>
            ) : (
                <>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.progressButton, isOffline && styles.disabledButton]}
                            onPress={() => navigation.navigate('WeeklyProgress')}
                            disabled={isOffline}
                        >
                            <Text style={[styles.progressButtonText, isOffline && styles.disabledButtonText]}>Weekly
                                Progress</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.topCategoriesButton, isOffline && styles.disabledButton]}
                            onPress={() => navigation.navigate('TopCategories')}
                            disabled={isOffline}
                        >
                            <Text style={[styles.topCategoriesButtonText, isOffline && styles.disabledButtonText]}>Top
                                Categories</Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={financialData}
                        keyExtractor={(item) => item}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.itemContainer}
                                onPress={() => navigation.navigate('FinancialDetails', {date: item})}
                            >
                                <Text style={styles.itemText}>{`Date: ${item}`}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </>
            )}
            <Toast/>
        </View>
    );
};

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
    disabledButton: {
        backgroundColor: '#999',
        opacity: 0.7,
    },
    disabledButtonText: {
        color: '#666',
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
    },
    topCategoriesButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        marginHorizontal: 8,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    topCategoriesButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FinancialDataScreen;
