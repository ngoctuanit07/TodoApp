import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { fetchTaskById, updateTask, deleteTask } from '../services/api';

const TaskDetailsScreen = ({ route, navigation }) => {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTaskById(taskId).then(setTask);
  }, [taskId]);

  const handleComplete = () => {
    updateTask(taskId, { completed: !task.completed }).then(setTask);
  };

  const handleDelete = () => {
    deleteTask(taskId).then(() => navigation.goBack());
  };

  if (!task) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{task.title}</Text>
      <Text>{task.description}</Text>
      <Text>{task.completed ? 'Completed' : 'Pending'}</Text>
      <Button title="Complete" onPress={handleComplete} />
      <Button title="Edit" onPress={() => navigation.navigate('TaskForm', { taskId: task.id })} />
      <Button title="Delete" onPress={handleDelete} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TaskDetailsScreen;
