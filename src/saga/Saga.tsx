import { call, put, takeEvery, StrictEffect } from 'redux-saga/effects';
import axiosInstance from '../interceptors';
import { GET_USERS_FETCH, GET_USERS_SUCCESS, DELETE_USERS, UPDATE_USER } from '../actions';
import { AxiosResponse } from 'axios';
import { DeleteUsersAction, UpdateUserAction, User } from './Saga.type';

function* workGetUsersFetch(): Generator<StrictEffect, void, AxiosResponse<User[]>> {
    try {
        const response = yield call(axiosInstance.get, '/users');
        yield put({ type: GET_USERS_SUCCESS, users: response.data });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function* workDeleteUsers(action: DeleteUsersAction): Generator<StrictEffect, void, AxiosResponse<any>> {
    console.log(action, 'action');
    const userId = action.payload;
    try {
        const response = yield call(axiosInstance.delete, `/users/${userId}`);
        console.log('User deleted successfully', response.data);
        yield put({ type: GET_USERS_FETCH });
    } catch (error) {
        console.error('Error deleting user:', error);
    }
}

function* workUpdateUser(action: UpdateUserAction): Generator<StrictEffect, void, AxiosResponse<User>> {
    console.log(action, 'action in edit');
    try {
        const response = yield call(axiosInstance.put, `/users/${action.payload.id}`, action.payload);
        console.log('User updated successfully', response.data);
    } catch (error) {
        console.error('Error updating user:', error);
    }
}

function* mySaga(): Generator {
    yield takeEvery(GET_USERS_FETCH, workGetUsersFetch);
    yield takeEvery(DELETE_USERS, workDeleteUsers);
    yield takeEvery(UPDATE_USER, workUpdateUser);
}

export default mySaga;
