import http from '../utils/http';

export declare interface User {
  _id: string;
  user: string;
  email: string;
  role: 'admin' | 'customer';
  token: string;
  createdAt: string;
  updatedAT: string;
}

export const signInUser = (user: string, pass: string) => {
  http
    .post<User>('/authentication/login', { user, pass })
    .then((res) => res.data);
};
