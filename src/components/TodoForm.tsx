import { useCallback, useState } from 'react';
import { createTodo } from '@/api/todo/todo';

type GetTodosList = {
  getTodosList: () => void;
};

export const TodoForm = ({ getTodosList }: GetTodosList) => {
  const token = localStorage.getItem('jwtToken');

  const [todo, setTodo] = useState<string>('');
  const onChangeTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  }, []);

  const [isClick, setIsClick] = useState(false);

  const onSubmitTodoFrom = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isClick) {
        createTodo(todo)
          .then(() => {
            alert('새로운 TODO가 입력되었습니다.');
            getTodosList();
            setTodo('');
            setIsClick(false);
          })
          .catch(() => {
            alert('저장중에 오류가 발생했습니다. 다시 시도해 주세요.');
            setIsClick(false);
          });
      }
    },
    [todo, token, isClick],
  );

  return (
    <form onSubmit={onSubmitTodoFrom}>
      <input
        type="text"
        data-testid="new-todo-input"
        value={todo}
        onChange={onChangeTodo}
        required
      />
      <button disabled={isClick}>{isClick ? '저장중' : '저장'}</button>
    </form>
  );
};
