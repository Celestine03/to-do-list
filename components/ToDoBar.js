import { TextInput, View, Pressable, Text, StyleSheet, KeyboardAvoidingView, Keyboard } from "react-native";
import React, { useState } from "react";
import { ProgressBar } from 'react-native-paper';

function ToDoBar({ tasks, setTasks, progress, setProgress }) {
    const [task, setTask] = useState('');
    
    const onChangeText = (text) => {
        setTask(text);
    };

    const handleSubmit = () => {
        if (task.length > 0) {
            let newIndex = tasks.findIndex((item) => item.checked);
            newIndex = newIndex === -1 ? tasks.length : newIndex;
            let numOfCompletedTasks = tasks.length - newIndex;
            setTasks([
                ...tasks.slice(0, newIndex),
                {
                    task: task,
                    checked: false,
                    id: Date.now().toString()
                },
                ...tasks.slice(newIndex)
            ]);
            let fraction = numOfCompletedTasks / (tasks.length + 1);
            setTask("");
            setProgress(fraction);
            Keyboard.dismiss();
        }
    };

    return (
        <KeyboardAvoidingView 
        behavior={ Platform.OS === "ios" ? "padding" : "height" }
        keyboardVerticalOffset={ Platform.OS === "ios" ? 84 : null }
        > 
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
            <Text style={ styles.text }>Progress</Text>
            <ProgressBar animatedValue={ progress } color='green' style={ styles.progress } />
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    inputBar: {
        width: '80%',
        height: 50,
        borderColor: '#000',
        borderBottomWidth: 1,
        fontSize: 15
    },
    addButton: {
        fontWeight: 'semibold',
        fontSize: 20,
        color: '#00f',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bar: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    progress: {
        margin: 10
    },
    text: {
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold'
    }
});

export default ToDoBar;