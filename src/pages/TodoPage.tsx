import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoList } from '@/components/TodoList';
import { TodoForm } from '@/components/TodoForm';
import { getTodos } from '@/api/todo/todo';

export interface TodoType {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

const TodoPage = () => {
  useEffect(() => {
    getTodosList();
  }, []);

  const [todoData, setTodoData] = useState<TodoType[]>([]);

  const navigate = useNavigate();

  const getTodosList = useCallback(() => {
    getTodos()
      .then((res) => {
        if (res.data.length !== 0) {
          setTodoData(res.data);
        } else {
          setTodoData([]);
        }
      })
      .catch(() => {
        alert(
          '데이터를 불러오는 중에 오류가 발생했습니다. 다시 시도해 주세요.',
        );
      });
  }, [navigate]);

  if (todoData.length === 0) {
    return (
      <div>
        <h3>데이터 로딩중 입니다...</h3>
      </div>
    );
  }

  return (
    <>
      <TodoForm getTodosList={getTodosList} />

      <div>
        {todoData.map((todoList) => {
          return <TodoList key={todoList?.id} todoList={todoList} />;
        })}
      </div>
    </>
  );
};

export default TodoPage;
