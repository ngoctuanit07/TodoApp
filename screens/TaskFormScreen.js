import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { fetchTaskById, createTask, updateTask } from '../services/api';

const TaskFormScreen = ({ route, navigation }) => {
  const { taskId } = route.params || {};
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    if (taskId) {
      fetchTaskById(taskId).then(task => {
        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed);
      });
    }
  }, [taskId]);

  const handleSubmit = () => {
    const taskData = { title, description, completed };
    if (taskId) {
      updateTask(taskId, taskData).then(() => navigation.goBack());
    } else {
      createTask(taskData).then(() => navigation.goBack());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />
      <View style={styles.checkboxContainer}>
        <CheckBox
          value={completed}
          onValueChange={setCompleted}
        />
        <Text style={styles.label}>Completed</Text>
      </View>
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
});

export default TaskFormScreen;
