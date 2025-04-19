import React, { useState } from 'react';

import AnimatedCheckBox from '@/components/animated-checkbox';
import Header from '@/components/home/header';
import { Pressable, View } from '@/components/ui';

const _spacing = 20;

const _todos = [
  'Coffee',
  'Bread',
  'hello',
  'Cheese',
  'Learning by doing',
  'Procrastinate',
].map((item) => {
  return {
    key: item,
    label: item,
    checked: false,
  };
});

const TodoScreen = () => {
  const [todos, setTodos] = useState(_todos);
  return (
    <View className="flex-1 bg-blue-100 dark:bg-charcoal-800">
      <Header title="TODO" />
      <View className="flex-[8]">
        {todos.map((todo) => {
          return (
            <Pressable
              key={todo.key}
              style={{ marginBottom: _spacing }}
              onPress={() => {
                const { key } = todo;
                const newTodos = todos.map((t) => {
                  if (t.key !== key) {
                    return t;
                  }

                  return {
                    ...t,
                    checked: !t.checked,
                  };
                });

                setTodos(newTodos);
              }}
            >
              <AnimatedCheckBox
                checked={todo.checked}
                text={todo.label}
                size={24}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default TodoScreen;
