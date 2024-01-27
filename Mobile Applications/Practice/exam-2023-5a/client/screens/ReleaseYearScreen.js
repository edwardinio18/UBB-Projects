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
import {appendLog} from '../log/Logger';

const ReleaseYearScreen = () => {
    const [yearsData, setYearsData] = useState([]);
    const [topGenres, setTopGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadMoviesData();
    }, []);

    const loadMoviesData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('http://192.168.0.17:2305/all');
            const yearCount = {};
            const genreCount = {};

            response.data.forEach(movie => {
                yearCount[movie.year] = (yearCount[movie.year] || 0) + 1;
                genreCount[movie.genre] = (genreCount[movie.genre] || 0) + 1;
            });

            const sortedYearsData = Object.entries(yearCount).sort((a, b) => b[1] - a[1]);
            const sortedGenresData = Object.entries(genreCount)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3); // Get top 3 genres

            setYearsData(sortedYearsData);
            setTopGenres(sortedGenresData);
            appendLog('Movies data fetched and processed successfully');
        } catch (error) {
            appendLog('Error fetching movies: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading ? (
                <ActivityIndicator size="large" color="#0000ff"/>
            ) : (
                <>
                    <Text style={styles.sectionTitle}>Movies by Year</Text>
                    <FlatList
                        data={yearsData}
                        keyExtractor={(item) => item[0]}
                        renderItem={({item}) => (
                            <View style={styles.yearItem}>
                                <Text style={styles.title}>Year: {item[0]}</Text>
                                <Text>Movies Released: {item[1]}</Text>
                            </View>
                        )}
                        showsVerticalScrollIndicator={false}
                    />

                    <Text style={styles.sectionTitle}>Top 3 Genres</Text>
                    {topGenres.map((genre, index) => (
                        <Text key={index} style={styles.genreItem}>
                            {genre[0]}: {genre[1]} movies
                        </Text>
                    ))}
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    yearItem: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 8,
        borderRadius: 5
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold'
    },
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
        paddingLeft: 10
    },
    genreItem: {
        fontSize: 18,
        paddingLeft: 10,
        marginVertical: 5
    },
});

export default ReleaseYearScreen;