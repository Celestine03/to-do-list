import { SafeAreaView, TextInput, View, Pressable, Text, StyleSheet } from "react-native";
import React, { useState } from "react";

function ToDoBar({ tasks, setTasks }) {
    const [task, setTask] = useState('');
    
    const onChangeText = (text) => {
        setTask(text);
    };

    const handleSubmit = () => {
        if (task.length > 0) {
            setTasks([
                ...tasks,
                {
                    task: task,
                    checked: false,
                    id: Date.now().toString()
                }
            ]);
            setTask("");
        }
    };

    return (
        <View style={ styles.bar }>
                <TextInput style={ styles.inputBar } 
                    onChangeText={ onChangeText }
                    value={ task }
                    maxLength={ 30 }
                />
                <Pressable onPress={ handleSubmit }>
                    <View>
                        <Text style={ styles.addButton }>Add</Text>
                    </View>
                </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    inputBar: {
        flex: 1,
        height: 50,
        borderRadius: 5,
        borderColor: '#000',
        borderBottomWidth: 1,
        fontSize: 15,
        padding: 5
    },
    addButton: {
        fontWeight: 'semibold',
        fontSize: 20,
        color: '#00f'
    },
    bar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        gap: 5
    }
});

export default ToDoBar;