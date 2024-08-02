import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { fetchTasks } from '../services/api';

const ReportScreen = () => {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then(tasks => {
      const completed = tasks.filter(task => task.completed && isToday(task.completedAt));
      setCompletedTasks(completed);
    });
  }, []);

  const isToday = (date) => {
    const today = new Date();
    const taskDate = new Date(date);
    return today.toDateString() === taskDate.toDateString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Tasks Today</Text>
      <FlatList
        data={completedTasks}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
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
  taskItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default ReportScreen;
