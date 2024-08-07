import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Task from './components/Task';
import { FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function App() {
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = () => {
    if (task === null || task.trim() === '') {
      Alert.alert('Error', 'Please enter a task');
      return;
    }
    Keyboard.dismiss();
    setTaskItems([...taskItems, { text: task, completed: false }]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed;
    setTaskItems(itemsCopy);
  }

  const deleteTask = (index) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            let itemsCopy = [...taskItems];
            itemsCopy.splice(index, 1);
            setTaskItems(itemsCopy);
          }
        }
      ]
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => completeTask(index)}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {item.completed ? (
              <View style={{ marginRight: 10, backgroundColor: 'green', width: 30, height: 30, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
                <MaterialCommunityIcons name="check" size={16} color="white" />
              </View>
            ) : (
              <View style={styles.checkBox} />
            )}
            <Task 
              text={item.text} 
              completed={item.completed} 
              textStyle={item.completed ? styles.completedText : styles.uncompletedText}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(index)}>
          <MaterialCommunityIcons name="trash-can" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Main view */}
      {/* Today task */}
      <View style={styles.taskWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          <FlatList
            data={taskItems}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>

      {/* Input */}
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? 'padding' : 'height'} style={styles.writeTaskWrapper}>

        <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />

        <TouchableOpacity onPress={() => handleAddTask()}>
          <View style={styles.addWrapper}>
          <MaterialCommunityIcons name="plus" size={24} color="black" />
          </View>
        </TouchableOpacity>

      </KeyboardAvoidingView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  taskWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  checkBox: {
    marginRight: 10, 
    backgroundColor: '#eeee',
    borderWidth: 1,
    width: 30, 
    height: 30, 
    borderRadius: 5, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  input: {
    paddingVertical: 20,
    paddingHorizontal: 25,
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    fontSize: 20,
    fontWeight: '500'
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: '50%',
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  completedText: {
    textDecorationLine: 'line-through',
  },
  uncompletedText: {
    textDecorationLine: 'none',
  },
})