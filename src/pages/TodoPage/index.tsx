import { createTodo, getTodo } from '@/api/todo';
import { createTodoType } from '@/api/todo/types';
import TodoForm from '@/components/todo/TodoForm';
import TodoItem from '@/components/todo/TodoItem';
import { ITodo } from '@/pages/TodoPage/types';
import { useCallback, useEffect, useState } from 'react';

const TodoPage = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const getTodos = useCallback(() => {
    getTodo()
      .then((res) => setTodos(res.data))
      .catch((err) => alert(err.response.data.log || err.log));
  }, []);

  const onSubmit = (todo: createTodoType) => {
    createTodo(todo)
      .then(() => getTodos())
      .catch((err) => alert(err.response.data.log || err.log));
  };

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  return (
    <div>
      <TodoForm submitFn={onSubmit} />
      <ul>
        {todos.map((todo) => {
          return <TodoItem key={todo.id} todo={todo} getTodos={getTodos} />;
        })}
      </ul>
    </div>
  );
};

export default TodoPage;
