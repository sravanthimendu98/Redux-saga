export const GET_USERS_FETCH = 'GET_USERS_FETCH';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const DELETE_USERS = 'DELETE_USERS';
export const UPDATE_USER = 'UPDATE_USER';


export const getUsersFetch = () => ({
    type: GET_USERS_FETCH
});

export const deleteUsers = (userIds: any) => ({
    type: DELETE_USERS,
    payload: userIds
});

export const updateUser = (user: any) => ({
    type: UPDATE_USER,
    payload: user
});


