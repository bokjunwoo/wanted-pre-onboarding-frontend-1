import { createTodoType } from '@/api/todo/types';

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export interface ITodoForm {
  submitFn: (todo: createTodoType) => void;
}

export interface ITodoItem {
  todo: ITodo;
  getTodos: () => void;
}
