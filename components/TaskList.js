import { View, Text, StyleSheet, FlatList } from "react-native";
import { Checkbox, Button } from "react-native-paper";

function TaskList({ tasks, setTasks }) {
    const handleDelete = (taskId) => {
        const newTasks = tasks.filter((item) => item.id != taskId);
        setTasks(newTasks);
    };

    const handleCheckboxChange= (task) => {
        const taskIndex = tasks.findIndex((item) => item.id === task.id);
        setTasks(!task.checked ? 
            [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1), { ...task, checked: !task.checked }] :
            [{ ...task, checked: !task.checked }, ...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)]);
    }

    return (
        <View style={ styles.container }>
            <FlatList style={ styles.list }
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={ styles.item }>
                        <Checkbox.Android uncheckedColor="#fff" color='#fff'
                            status={ item.checked ? 'checked' : 'unchecked' }
                            onPress={ () => handleCheckboxChange(item) }
                        />
                        <Text style={ styles.text }>{ item.task }</Text>
                        <Button onPress={ () => handleDelete(item.id) } style={ styles.deleteButton } icon="delete-empty" textColor='#fff'>
                            <Text></Text>
                        </Button>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingTop: 10,
        backgroundColor: '#000',
        borderRadius: 10
    },
    deleteButton: {
        fontWeight: 'semibold',
        fontSize: 16
    },
    item: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    container: {
        flexGrow: 0,
        height: '65%'
    },
    text: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export default TaskList;