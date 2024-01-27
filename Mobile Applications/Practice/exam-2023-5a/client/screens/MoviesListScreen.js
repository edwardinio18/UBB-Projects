import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Button} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import NetInfo from '@react-native-community/netinfo';
import {appendLog} from "../log/Logger";
import WebSocketClient from "../websocket/WebSocketClient";

const MoviesListScreen = ({route}) => {
    const navigation = useNavigation();
    const {genre} = route.params;
    const [movies, setMovies] = useState([]);
    const [isOffline, setIsOffline] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        loadMovies();

        return () => unsubscribe();
    }, [genre]);

    const onWebSocketMessage = (message) => {
        try {
            const newMovie = JSON.parse(message);
            setMovies((prevMovies) => [...prevMovies, newMovie]);
        } catch (error) {
            console.error('Error parsing WebSocket message');
        }
    };

    WebSocketClient(onWebSocketMessage);

    const loadMovies = async () => {
        setIsLoading(true);
        const storedMovies = await getData(`@movies_${genre}`);
        if (isOffline) {
            if (storedMovies) {
                appendLog('Loaded movies from AsyncStorage');
                setMovies(storedMovies);
            } else {
                setIsOffline(true);
            }
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.get(`http://192.168.0.17:2305/movies/${genre}`);
            setMovies(response.data);
            await storeData(`@movies_${genre}`, response.data);
            appendLog('Movies fetched successfully from server');
            setIsOffline(false);
        } catch (error) {
            appendLog('Error fetching movies: ' + error.message);
            if (storedMovies) {
                setMovies(storedMovies);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: 'Failed to fetch movies.',
                    visibilityTime: 5000,
                });
                setIsOffline(true);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const storeData = async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value);
            appendLog('Storing data in AsyncStorage');
            await AsyncStorage.setItem(key, jsonValue);
        } catch (e) {
            appendLog('Error storing data', e);
        }
    };

    const getData = async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            appendLog('Retrieved data from AsyncStorage');
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch (e) {
            appendLog('Error retrieving data', e);
        }
    };

    const deleteMovie = async (movieId) => {
        if (isOffline) {
            Toast.show({
                type: 'error',
                text1: 'Offline',
                text2: 'Cannot delete movies while offline.',
                visibilityTime: 5000,
            });
            return;
        }

        try {
            await axios.delete(`http://192.168.0.17:2305/movie/${movieId}`);
            appendLog('Movie deleted successfully from server');
            appendLog(`Deleted movie with ID ${movieId}`);

            setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
            storeData(`@movies_${genre}`, movies);
        } catch (error) {
            appendLog('Error deleting movie:', error);
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Failed to delete movie.',
                visibilityTime: 5000,
            });
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff"/>
            ) : isOffline && !movies.length ? (
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>You are offline</Text>
                    <Button title="Retry" onPress={loadMovies} color="#007AFF"/>
                </View>
            ) : (
                <>
                    <FlatList
                        data={movies}
                        keyExtractor={(movie) => movie.id.toString()}
                        renderItem={({item}) => (
                            <View style={styles.movieItem}>
                                <Text style={styles.movieTitle}>{item.name}</Text>
                                <Text>Description: {item.description}</Text>
                                <Text>Director: {item.director}</Text>
                                <Text>Year: {item.year}</Text>
                                <Text>Genre: {item.genre}</Text>
                                <TouchableOpacity
                                    style={[styles.deleteButton, isOffline && styles.disabledButton]}
                                    onPress={() => deleteMovie(item.id)}
                                    disabled={isOffline}
                                >
                                    <Text
                                        style={[styles.deleteButtonText, isOffline && styles.disabledButtonText]}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />

                    <TouchableOpacity
                        style={[styles.addButton, isOffline && styles.disabledButton]}
                        onPress={() => navigation.navigate('AddMovie', {genre})}
                        disabled={isOffline}
                    >
                        <Text style={[styles.addButtonText, isOffline && styles.disabledButtonText]}>Add New
                            Movie</Text>
                    </TouchableOpacity>
                </>
            )}
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
    loadingIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    movieItem: {
        backgroundColor: '#e6e6e6',
        padding: 16,
        borderRadius: 8,
        marginBottom: 12,
    },
    movieTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    deleteButton: {
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginTop: 10,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
});

export default MoviesListScreen;