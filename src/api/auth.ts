import API from './api';

export const signUp = (email: string, password: string) => {
  return API.post('/auth/signup', {
    email,
    password,
  });
};

export const signIn = (email: string, password: string) => {
  return API.post('/auth/signin', {
    email,
    password,
  });
};
