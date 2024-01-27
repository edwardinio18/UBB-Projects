import React, {useState} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";

const AddMovieScreen = ({route}) => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const selectedGenre = route.params.genre;
    const [genre, setGenre] = useState('');
    const [director, setDirector] = useState('');
    const [year, setYear] = useState('');

    const handleSubmit = async () => {
        if (!name || !description || !director || !year) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            await axios.post('http://192.168.0.17:2305/movie', {
                name,
                description,
                genre: selectedGenre,
                director,
                year: parseInt(year, 10),
            });
            Alert.alert('Success', 'Movie added successfully');
            setName('');
            setDescription('');
            setDirector('');
            setYear('');
            navigation.navigate('MoviesList', {genre: selectedGenre});
        } catch (error) {
            console.error('Error adding movie:', error);
            Alert.alert('Error', 'Failed to add movie');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName}/>

                <Text style={styles.label}>Description:</Text>
                <TextInput style={styles.input} value={description} onChangeText={setDescription}/>

                <Text style={styles.label}>Genre:</Text>
                <TextInput style={styles.input} value={selectedGenre} onChangeText={setGenre} editable={false}/>

                <Text style={styles.label}>Director:</Text>
                <TextInput style={styles.input} value={director} onChangeText={setDirector}/>

                <Text style={styles.label}>Year:</Text>
                <TextInput
                    style={styles.input}
                    value={year}
                    onChangeText={setYear}
                    keyboardType="numeric"
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Movie</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    label: {
        fontSize: 18,
        color: '#333',
        marginBottom: 6,
    },
    input: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 4,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default AddMovieScreen;