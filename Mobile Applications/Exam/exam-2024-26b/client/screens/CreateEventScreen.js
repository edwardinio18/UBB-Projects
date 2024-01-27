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
    ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import {appendLog} from "../log/Logger";

const CreateEventScreen = () => {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [team, setTeam] = useState('');
    const [details, setDetails] = useState('');
    const [status, setStatus] = useState('');
    const [participants, setParticipants] = useState('');
    const [eventType, setEventType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !team || !details || !status || !participants || !eventType) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            setIsLoading(true);
            await axios.post('http://172.30.111.235:2426/event', {
                name,
                team,
                details,
                status,
                participants: parseInt(participants),
                type: eventType,
            });
            setIsLoading(false);
            Alert.alert('Success', 'Event added successfully');
            setName('');
            setTeam('');
            setDetails('');
            setStatus('');
            setParticipants('');
            setEventType('');
            navigation.navigate('EventList');
        } catch (error) {
            setIsLoading(false);
            appendLog('Error adding event');
            Alert.alert('Error', 'Failed to add event');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName}/>

                <Text style={styles.label}>Team:</Text>
                <TextInput style={styles.input} value={team} onChangeText={setTeam}/>

                <Text style={styles.label}>Details:</Text>
                <TextInput style={styles.input} value={details} onChangeText={setDetails}/>

                <Text style={styles.label}>Status:</Text>
                <TextInput style={styles.input} value={status} onChangeText={setStatus}/>

                <Text style={styles.label}>Participants:</Text>
                <TextInput
                    style={styles.input}
                    value={participants}
                    onChangeText={setParticipants}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Event Type:</Text>
                <TextInput style={styles.input} value={eventType} onChangeText={setEventType}/>

                {/* Add ActivityIndicator while isLoading is true */}
                {isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff"/>
                ) : (
                    <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Create Event</Text>
                    </TouchableOpacity>
                )}
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

export default CreateEventScreen;