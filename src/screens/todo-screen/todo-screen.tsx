/* eslint-disable max-lines-per-function */
import { zodResolver } from '@hookform/resolvers/zod';
import { observer, use$ } from '@legendapp/state/react';
import React, { useCallback, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FlatList } from 'react-native';
import { z } from 'zod';

import AnimatedCheckBox from '@/components/animated-checkbox';
import Backdrop from '@/components/backdrop';
import { FabButton } from '@/components/fab-button';
import Header from '@/components/home/header';
import {
  Button,
  colors,
  ControlledInput,
  Pressable,
  Text,
  View,
} from '@/components/ui';
import { closeFab, fabState$ } from '@/lib/state/fab-actions';
import { addTodo, todoState$, toggleTodo } from '@/lib/state/todo-actions';
const _spacing = 20;

const todoSchema = z.object({
  label: z.string().min(1, 'Label is required'),
});

type TodoFormType = z.infer<typeof todoSchema>;

type TodoItemProps = {
  id: string;
  checked: boolean;
  label: string;
  onToggle: (id: string) => void;
};

// Memoized TodoItem component
const TodoItem = React.memo(
  ({ id, checked, label, onToggle }: TodoItemProps) => (
    <Pressable style={{ marginBottom: _spacing }} onPress={() => onToggle(id)}>
      <AnimatedCheckBox checked={checked} text={label} size={24} />
    </Pressable>
  )
);

const TodoScreen = observer(() => {
  const [isPending, startTransition] = useTransition();
  const todos = use$(todoState$.todos);
  const isOpen = use$(fabState$.isOpen);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<TodoFormType>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      label: '',
    },
  });

  const onSubmit = useCallback(
    (data: TodoFormType) => {
      addTodo(data.label);
      startTransition(() => {
        reset();
        closeFab();
      });
    },
    [reset]
  );

  const handleToggle = useCallback((id: string) => {
    toggleTodo(id);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <TodoItem
        id={item.key}
        checked={item.checked}
        label={item.label}
        onToggle={handleToggle}
      />
    ),
    [handleToggle]
  );

  const keyExtractor = useCallback((item: any) => item.key, []);

  return (
    <View className="flex-1 bg-blue-100 dark:bg-charcoal-950">
      <Header title="TODO" />
      <View className="flex-[8]">
        <FlatList
          data={Object.values(todos)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          removeClippedSubviews
          maxToRenderPerBatch={10}
          windowSize={5}
          initialNumToRender={10}
        />
      </View>
      {isOpen && <Backdrop onPress={() => closeFab()} duration={500} />}
      <FabButton
        header="Add Todo"
        raise={30}
        panelStyle={{
          backgroundColor: colors.primary[500],
          left: '50%',
          transform: [{ translateX: '-50%' }, { translateY: '30%' }],
        }}
        duration={500}
      >
        <Text>Add Todo</Text>
        <ControlledInput
          placeholder="Enter a todo"
          control={control}
          name="label"
        />
        <Button
          disabled={isPending || !isValid}
          variant="outline"
          onPress={handleSubmit(onSubmit)}
        >
          <Text>Add Todo</Text>
        </Button>
      </FabButton>
    </View>
  );
});

export default TodoScreen;
