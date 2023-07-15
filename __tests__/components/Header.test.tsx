import React from 'react';
import { Header } from '../../src/components/Header';
import { screen, render } from '@testing-library/react-native';

describe('Header', () => {
  it('should be able to render tasks counter correctly', async () => {
    let mockedTasksCounter = 0;

    render(<Header tasksCounter={mockedTasksCounter} />).toJSON();

    expect(screen.getByText('0 tarefas'));

    mockedTasksCounter = 1;

    render(<Header tasksCounter={mockedTasksCounter} />);
    
    expect(screen.getByText('1 tarefa'));

    mockedTasksCounter = 2;

    render(<Header tasksCounter={mockedTasksCounter} />);
    
    expect(screen.getByText('2 tarefas'));
  });
});