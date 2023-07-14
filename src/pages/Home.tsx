import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let newTask = {
      id: Math.random(),
      title: newTaskTitle,
      done: false
    }
    setTasks(state => [...state, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks: Task[] = tasks.map(task => {
      if (task.id === id) {
        return {
          id: task.id,
          title: task.title,
          done: !task.done
        } as Task;
      } else {
        return task;
      }
    })
    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    const updatedTasks = tasks.filter(task => {
      return task.id !== id
    });
    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})