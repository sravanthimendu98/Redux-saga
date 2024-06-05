import { DELETE_USERS, UPDATE_USER } from '../actions';

export interface User {
    id: number;
    name: string;
    phone: string;
    email: string;
    website: string;
}

export interface DeleteUsersAction {
    type: typeof DELETE_USERS;
    payload: number;
}

export interface UpdateUserAction {
    type: typeof UPDATE_USER;
    payload: User;
}