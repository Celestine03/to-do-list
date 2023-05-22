import { Text, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ToDoBar from "../components/ToDoBar";
import TaskList from "../components/TaskList";

const Home = () => {
    const [tasks, setTasks] = useState([]);
    const [progress, setProgress] = useState(0);

    return (
        <View style={ styles.container }>
                <Text style={ styles.title }>To Do List</Text>
                <TaskList tasks={ tasks } setTasks={ setTasks } progress={ progress } setProgress={ setProgress } />
                <ToDoBar tasks={ tasks } setTasks={ setTasks } progress={ progress } setProgress={ setProgress } />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00f',
        margin: 10
    }, 
    container: {
        justifyContent: 'center',
        height: '100%'
    }
});

export default Home;