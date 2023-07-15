import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react-native';
import { TasksList } from '../../src/components/TasksList';

type Task = {
    id: number;
    title: string;
    done: boolean;
}

let tasks: Task[] = [];

let mockedRemoveTask : jest.Mock;
let mockedToggleTaskDone: jest.Mock;

describe('MyTasksList', () => {

  beforeAll(() => {
    tasks = [
      {
        id: 1,
        title: 'Primeiro todo',
        done: false
      },
      {
        id: 2,
        title: 'Segundo todo',
        done: false
      },
      {
        id: 3,
        title: 'Terceiro todo',
        done: true
      },
    ];

    mockedRemoveTask = jest.fn()
    mockedToggleTaskDone = jest.fn()
  });

  it('should be able to render all tasks', () => {
    render(<TasksList tasks={tasks} removeTask={mockedRemoveTask} toggleTaskDone={mockedToggleTaskDone} />)
    
    expect(screen.getByText('Primeiro todo'));
    expect(screen.getByText('Segundo todo'));
    expect(screen.getByText('Terceiro todo'));
  });

  it('should be able to handle "removeTask" event', () => {
    render(<TasksList tasks={tasks} removeTask={mockedRemoveTask} toggleTaskDone={mockedToggleTaskDone} />)
    const firstTaskTrashIcon = screen.getByTestId('trash-0');

    fireEvent(firstTaskTrashIcon, 'press');

    expect(mockedRemoveTask).toHaveBeenCalledWith(tasks[0].id);
  });

  it('should be able to handle "toggleTaskDone" event', () => {    
    render(<TasksList tasks={tasks} removeTask={mockedRemoveTask} toggleTaskDone={mockedToggleTaskDone} />)
    const secondTask = screen.getByText('Segundo todo');

    fireEvent.press(secondTask);

    expect(mockedToggleTaskDone).toHaveBeenCalledWith(tasks[1].id);
  });
})