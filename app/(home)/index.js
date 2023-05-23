import { useState, useEffect } from "react";
import { supabase } from '../lib/supabase';
import { Checkbox, Button } from "react-native-paper";
import { Alert, TextInput, View, Pressable, Text, StyleSheet, KeyboardAvoidingView, Keyboard, Platform, FlatList } from "react-native";
import { ProgressBar } from 'react-native-paper';
import { useAuth } from "../contexts/auth";

const Homepage = () => {
    const [task, setTask] = useState('');
    const [progress, setProgress] = useState(0);
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();

    async function fetchTasks() {
        let { data } = await supabase.from('todos').select('*');
        setTasks(data);
    }

    useEffect(() => {
        fetchTasks();
    }, []);
    
    const onChangeText = (text) => {
        setTask(text);
    };

    const handleSubmit = async () => {
        if (task.length > 0) {
            const { error } = await supabase.from('todos').insert({ user_id: user.id, task: task }).select().single();
            if (error != null) {
                Alert.alert(error.message);
            } else {
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
        }
    };

    const handleDelete = async (task) => {
        const { error } = await supabase.from('todos').delete(task).eq('id', task.id);
        if (error != null) {
            Alert.alert(error.message);
        } else {
            const newTasks = tasks.filter((item) => item.id != task.id);
            setTasks(newTasks);
            let numOfCompletedTasks = newTasks.filter(task => task.checked).length;
            let fraction = newTasks.length === 0 || numOfCompletedTasks === 0 ? 0.0000000001 : numOfCompletedTasks / newTasks.length;
            setProgress(fraction);
        }
    };

    const handleCheckboxChange= async (task) => {
        const { error } = await supabase.from('todos').update({ is_checked: !task.checked }).eq('id', task.id);
        if (error != null) {
            Alert.alert(error.message);
        } else {
            const taskIndex = tasks.findIndex((item) => item.id === task.id);
            setTasks(!task.checked ? 
                [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1), { ...task, checked: !task.checked }] :
                [{ ...task, checked: !task.checked }, ...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]);
            let numOfCompletedTasks = task.checked ? tasks.filter(task => task.checked).length - 1 : tasks.filter(task => task.checked).length + 1;
            let fraction = numOfCompletedTasks == 0 ? 0.0000000001 : numOfCompletedTasks / tasks.length;
            setProgress(fraction);
        }
    }

    return (
        <KeyboardAvoidingView 
        behavior={ Platform.OS === "ios" ? "padding" : "height" }
        keyboardVerticalOffset={ Platform.OS === "ios" ? 184 : null }
        > 
            <View style={ styles.container }>
                <FlatList style={ styles.list }
                    data={tasks}
                    keyExtractor={ (item) => item.id }
                    renderItem={({ item }) => (
                        <View style={ styles.item }>
                            <Checkbox.Android uncheckedColor="#fff" color='#fff'
                                status={ item.checked ? 'checked' : 'unchecked' }
                                onPress={ () => handleCheckboxChange(item) }
                            />
                            <Text style={ styles.text }>{ item.task }</Text>
                            <Button onPress={ () => handleDelete(item) } style={ styles.deleteButton } icon="delete-empty" textColor='#fff'>
                                <Text></Text>
                            </Button>
                        </View>
                    )}
                />
            </View>
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
            <Text style={ styles.header }>Progress</Text>
            <ProgressBar animatedValue={ progress } color='green' style={ styles.progress } />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    list: {
        marginBottom: 20,
        backgroundColor: '#000',
        borderRadius: 10, 
    },
    deleteButton: {
        fontWeight: 'semibold',
        fontSize: 16
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    container: {
        height: '70%',
        flexShrink: 100
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    },
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
    header: {
        textAlign: 'center',
        marginTop: 30,
        fontWeight: 'bold'
    }
});

export default Homepage;