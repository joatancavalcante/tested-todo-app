import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskType = {
  id: number,
  newTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const taskWithSameTitle = tasks.find(tasks => tasks.title === newTaskTitle);
    if (taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }  

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
    Alert.alert('Remover item', 'Tem certeza que deseja remover este item?', [
      {
        style: 'cancel',
        text: 'Não'
      },{
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const updatedTasks = tasks.filter(task => {
            return task.id !== id
          });
          setTasks(updatedTasks);
        }
      }
    ])
  }

  function handleEditTask({id, newTitle}: EditTaskType){
    const updatedTasks = tasks.map(task => ({...task}));
    const taskToBeUpdated = updatedTasks.find(task => task.id === id);
    if (!taskToBeUpdated){
      return;
    }
    taskToBeUpdated.title = newTitle;
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
        editTask={handleEditTask}        
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