import { deleteTodo, updateCheck, updateTodo } from '@/api/todo';
import { ITodoItem } from '@/pages/TodoPage/types';
import { useCallback, useState } from 'react';

const TodoItem = ({ todo, getTodos }: ITodoItem) => {
  const [isClick, setIsClick] = useState(false);

  // 글 수정
  const [text, setText] = useState(todo.todo);
  const onChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  // 수정 버튼
  const [isModify, setIsModify] = useState(true);
  const amendButtonChange = useCallback(() => {
    setIsModify((prev) => !prev);
  }, []);

  // 글 수정 폼
  const onSubmitForm = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isClick) {
        setIsClick(true);
        updateTodo(text, todo.id, todo.isCompleted)
          .then(() => {
            getTodos();
            setIsModify(true);
            setIsClick(false);
          })
          .catch((err) => {
            alert(err.response.data.log || err.log);
            setIsClick(false);
          });
      }
    },
    [isClick, text, todo.id, todo.isCompleted, getTodos],
  );

  const removeTodo = useCallback(() => {
    if (!isClick) {
      setIsClick(true);
      deleteTodo(todo.id)
        .then(() => {
          alert('삭제되었습니다.');
          getTodos();
          setIsClick(false);
        })
        .catch((err) => {
          alert(err.response.data.log || err.log);
          setIsClick(false);
        });
    }
  }, [isClick, todo.id, getTodos]);

  const checkboxChange = useCallback(() => {
    updateCheck(text, todo.id, todo.isCompleted)
      .then(() => {
        getTodos();
      })
      .catch((err) => {
        alert(err.response.data.log || err.log);
      });
  }, [getTodos, text, todo.id, todo.isCompleted]);

  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={checkboxChange}
        />
      </label>

      {isModify ? (
        <>
          <span>{todo.todo}</span>
          <button data-testid="modify-button" onClick={amendButtonChange}>
            수정
          </button>
          <button data-testid="delete-button" onClick={removeTodo}>
            삭제
          </button>
        </>
      ) : (
        <form onSubmit={onSubmitForm}>
          <input
            type="text"
            value={text}
            onChange={onChangeText}
            data-testid="modify-input"
            required
          />
          <button data-testid="submit-button" disabled={isClick}>
            {isClick ? '제출중' : '제출'}
          </button>
          <button onClick={amendButtonChange} data-testid="cancel-button">
            취소
          </button>
        </form>
      )}
    </li>
  );
};

export default TodoItem;
