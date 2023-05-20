import { Text, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import ToDoBar from "../components/ToDoBar";
import TaskList from "../components/TaskList";

const Home = () => {
    const [tasks, setTasks] = useState([]);

    return (
        <View style={ styles.container }>
                <Text style={ styles.title }>To Do List</Text>
                <TaskList style={ styles.list } tasks={ tasks } setTasks={ setTasks } />
                <ToDoBar style={ styles.bottom } tasks={ tasks } setTasks={ setTasks } />
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#00f',
        margin: 5,
        justifyContent: 'flex-start'
    }, 
    container: {
        flexDirection: 'column'
    }
});

export default Home;