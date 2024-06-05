import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import UserDetails from './UserDetails';
import { deleteUsers, updateUser } from '../../actions';
import { User } from './UserDetails.type';
import rootSaga from '../../saga/Saga';

const sagaMiddleware = createSagaMiddleware();
const mockStore = configureStore([sagaMiddleware]);

jest.mock('../../actions', () => ({
  getUsersFetch: jest.fn(),
  deleteUsers: jest.fn(),
  updateUser: jest.fn(),
}));

const initialState = {
  myFirstReducer: {
    users: [
      { id: 1, name: 'John Doe', phone: '1234567890', email: 'john@example.com', website: 'www.john.com' },
      { id: 2, name: 'Jane Doe', phone: '0987654321', email: 'jane@example.com', website: 'www.jane.com' }
    ] as User[]
  }
};

const renderWithStore = (store: any) => {
  render(
    <Provider store={store}>
      <UserDetails />
    </Provider>
  );
};

describe('UserDetails Component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore(initialState);
    sagaMiddleware.run(rootSaga);
  });

  it('should render the DataGrid with users', () => {
    renderWithStore(store);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Doe')).toBeInTheDocument();
  });

  it('should dispatch deleteUsers action on delete button click', () => {
    renderWithStore(store);

    fireEvent.click(screen.getByRole('checkbox', { name: /john doe/i }));

    fireEvent.click(screen.getByText('Delete'));

    expect(deleteUsers).toHaveBeenCalledWith(1);
  });

  it('should allow editing a user and dispatch updateUser action on save', async () => {
    renderWithStore(store);

    fireEvent.click(screen.getByRole('checkbox', { name: /john doe/i }));

    fireEvent.click(screen.getByText('Edit'));

    const nameInput = screen.getByLabelText('Name');
    fireEvent.change(nameInput, { target: { value: 'Johnathan Doe' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(updateUser).toHaveBeenCalledWith({
        id: 1,
        name: 'Johnathan Doe',
        phone: '1234567890',
        email: 'john@example.com',
        website: 'www.john.com',
      });
    });
  });
});
