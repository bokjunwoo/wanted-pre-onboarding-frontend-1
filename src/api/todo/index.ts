import apiClient from '@/api/apiClient';
import { createTodoType } from '@/api/todo/types';

export const getTodo = async () => {
  return await apiClient({
    method: 'get',
    url: '/todos',
  });
};

export const createTodo = async (todo: createTodoType) => {
  return await apiClient({
    method: 'post',
    url: '/todos',
    data: {
      todo,
    },
  });
};

export const updateCheck = async (
  todo: string,
  id: number,
  isCompleted: boolean,
) => {
  return await apiClient({
    method: 'put',
    url: `/todos/${id}`,
    data: {
      isCompleted: !isCompleted,
      todo,
    },
  });
};

export const updateTodo = async (
  todo: string,
  id: number,
  isCompleted: boolean,
) => {
  return await apiClient({
    method: 'put',
    url: `/todos/${id}`,
    data: {
      isCompleted,
      todo,
    },
  });
};

export const deleteTodo = async (id: number) => {
  return await apiClient({
    method: 'delete',
    url: `/todos/${id}`,
  });
};
