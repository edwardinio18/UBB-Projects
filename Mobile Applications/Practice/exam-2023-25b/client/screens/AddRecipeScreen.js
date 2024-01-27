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
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from "@react-navigation/native";

const AddRecipeScreen = ({route}) => {
    const navigation = useNavigation();
    const categorySelected = route.params.category;
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');
    const [difficulty, setDifficulty] = useState('easy');

    const handleSubmit = async () => {
        if (!name || !description || !ingredients || !instructions || !difficulty) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        try {
            await axios.post('http://192.168.0.150:2325/recipe', {
                name,
                description,
                ingredients,
                instructions,
                category: categorySelected,
                difficulty,
            });
            Alert.alert('Success', 'Recipe added successfully');
            setName('');
            setDescription('');
            setIngredients('');
            setInstructions('');
            setDifficulty('');
            navigation.navigate('RecipesList', {category: categorySelected});
        } catch (error) {
            console.error('Error adding recipe:', error);
            Alert.alert('Error', 'Failed to add recipe');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <Text style={styles.label}>Name:</Text>
                <TextInput style={styles.input} value={name} onChangeText={setName}/>

                <Text style={styles.label}>Description:</Text>
                <TextInput style={styles.input} value={description} onChangeText={setDescription}/>

                <Text style={styles.label}>Category:</Text>
                <TextInput style={styles.input} value={categorySelected} editable={false}/>

                <Text style={styles.label}>Ingredients:</Text>
                <TextInput style={styles.input} value={ingredients} onChangeText={setIngredients}/>

                <Text style={styles.label}>Instructions:</Text>
                <TextInput style={styles.input} value={instructions} onChangeText={setInstructions}/>

                <Text style={styles.label}>Difficulty:</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={difficulty}
                        onValueChange={(itemValue, itemIndex) => setDifficulty(itemValue)}
                        style={styles.picker}
                    >
                        <Picker.Item label="Easy" value="easy" />
                        <Picker.Item label="Medium" value="medium" />
                        <Picker.Item label="Hard" value="hard" />
                    </Picker>
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Add Recipe</Text>
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
    pickerContainer: {
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        marginBottom: 15,
    },
    picker: {
        paddingHorizontal: 15,
        paddingVertical: 1,
    },
});

export default AddRecipeScreen;