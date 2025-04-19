import 'react-native-get-random-values';

import { observable } from '@legendapp/state';
import { v4 as uuidv4 } from 'uuid';

export type Todo = {
  key: string;
  label: string;
  checked: boolean;
};

export type TodoRecord = Record<string, Todo>;

const generateKey = () => {
  return uuidv4();
};

export const todoState$ = observable({
  todos: {} as TodoRecord,
});

export const addTodo = (label: string) => {
  const key = generateKey();
  todoState$.todos[key].set({ key, label, checked: false });
};

export const toggleTodo = (key: string) => {
  const todo = todoState$.todos[key].get();
  if (todo) {
    todoState$.todos[key].set({ ...todo, checked: !todo.checked });
  }
};

export const deleteTodo = (key: string) => {
  delete todoState$.todos[key];
};
