import { TodoType } from '@/pages/TodoPage';

export const TodoList = ({ todoList }: { todoList: TodoType }) => {
  return (
    <li>
      <label>
        <input type="checkbox" />
        <span>{todoList.todo}</span>
      </label>
    </li>
  );
};
