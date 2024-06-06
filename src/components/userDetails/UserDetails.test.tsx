import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import UserDetails from './UserDetails';
import { getUsersFetch, deleteUsers, updateUser } from '../../actions';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

jest.mock('../../actions', () => ({
  getUsersFetch: jest.fn(() => ({ type: 'GET_USERS_FETCH' })),
  deleteUsers: jest.fn((id) => ({ type: 'DELETE_USER', payload: id })),
  updateUser: jest.fn((user) => ({ type: 'UPDATE_USER', payload: user })),
}));

const initialState = {
  myFirstReducer: {
    users: [
      { id: 1, name: 'John Doe', phone: '123-456-7890', email: 'john@example.com', website: 'john.com' },
      { id: 2, name: 'Jane Doe', phone: '987-654-3210', email: 'jane@example.com', website: 'jane.com' },
    ],
  },
};

const renderComponent = (state = initialState) => {
  const store = mockStore(state);
  return render(
    <Provider store={store}>
      <UserDetails />
    </Provider>
  );
};

describe('UserDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  test('fetches users on mount', () => {
    renderComponent();
    expect(getUsersFetch).toHaveBeenCalled();
  });

  test('allows row selection and deletion', async () => {
    renderComponent();

    const rowCheckboxes = await screen.findAllByRole('checkbox');
    fireEvent.click(rowCheckboxes[1]); 

    const deleteButton = screen.getByText('Delete');
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(deleteUsers).toHaveBeenCalledWith(1);
    });
  });

  test('allows editing a user', async () => {
    renderComponent();

    const rowCheckboxes = await screen.findAllByRole('checkbox');
    fireEvent.click(rowCheckboxes[1]); 

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'John Updated' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({
        id: 1,
        name: 'John Updated',
        phone: '123-456-7890',
        email: 'john@example.com',
        website: 'john.com',
      });
    });
  });
});
