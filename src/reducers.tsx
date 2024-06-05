import { GET_USERS_SUCCESS, DELETE_USERS, UPDATE_USER } from "./actions";

interface State {
    users: any[];
}

const initialState: State = {
    users: [],
};

const myFirstReducer = (state = initialState, action: any): State => {
    switch (action.type) {
        case GET_USERS_SUCCESS:
            return { ...state, users: action.users };
        case DELETE_USERS:
            return {
                ...state,
                users: state.users.filter((user: any) => !action.payload.includes(user.id))
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map((user: any) => user.id === action.payload.id ? action.payload : user)
            };
        default:
            return state;
    }
};

export default myFirstReducer;



