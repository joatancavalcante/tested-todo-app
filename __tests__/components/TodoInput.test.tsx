import React from 'react';
import { TodoInput } from '../../src/components/TodoInput';
import { fireEvent, screen, render } from '@testing-library/react-native';

let mockedAddTask: jest.Mock;

//The line bellow hide an warning relates to "Animated: useNativeDriver is not supported"
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

describe('TodoInput', () => {
  beforeAll(() => {
    mockedAddTask = jest.fn();
  })

  it('should be able to submit the input text by addButton', () => {
    const { getByPlaceholderText, getByTestId } = render(<TodoInput addTask={mockedAddTask} />);
    const inputText = getByPlaceholderText('Adicionar novo todo...');
    const addButton = getByTestId('add-new-task-button');

    fireEvent.changeText(inputText, 'Primeira task');
    fireEvent.press(addButton);

    expect(mockedAddTask).toHaveBeenCalledWith('Primeira task');
  });

  it('should not be able to add an empty task', () => {
    const { getByPlaceholderText } = render(<TodoInput addTask={mockedAddTask} />);
    const inputText = getByPlaceholderText('Adicionar novo todo...');
    
    fireEvent.changeText(inputText, '');
    fireEvent(inputText, 'submitEditing');

    expect(mockedAddTask).not.toHaveBeenCalledWith('');
  });
});