import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsersFetch, deleteUsers, updateUser } from '../../actions';
import { Box, Button, TextField } from '@mui/material';
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import Navbar from '../navbar/Navbar';
import { User } from './UserDetails.type';

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'website', headerName: 'Website', width: 200 },
];

const UserDetails: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: any) => state?.myFirstReducer?.users) as User[];
  const [userDetails, setUserDetails] = useState<User[]>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  useEffect(() => {
    setUserDetails(users);
  }, [users]);

  const handleDelete = () => {
    if (rowSelectionModel.length > 0) {
      rowSelectionModel.forEach((userId) => {
        dispatch(deleteUsers(userId as number));
      });
      setRowSelectionModel([]); 
      dispatch(getUsersFetch());
    }
  };

  const handleEdit = () => {
    const userToEdit = userDetails.find(user => user.id === rowSelectionModel[0]);
    if (userToEdit) {
      setEditingUser(userToEdit);
    }
  };

  useEffect(() => {
    dispatch(getUsersFetch());
  }, [editingUser]);

  const handleSave = () => {
    if (editingUser) {
      dispatch(updateUser(editingUser));
      setEditingUser(null);
      setRowSelectionModel([]);
      dispatch(getUsersFetch());
    }
  };

  const handleFieldChange = (field: keyof User, value: string) => {
    if (editingUser) {
      setEditingUser({
        ...editingUser,
        [field]: value,
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="App">
        <Box sx={{ marginTop: '5%' }}>
          {userDetails?.length > 0 &&
            <DataGrid
              rows={userDetails}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(newSelection) => {
                setRowSelectionModel(newSelection);
              }}
              rowSelectionModel={rowSelectionModel}
              sx={{ marginTop: '50px', width: '70%', margin: "auto" }}
            />
          }
        </Box>

        {rowSelectionModel.length > 0 && (
          <div>
            <Button
              variant='contained'
              sx={{ marginTop: '20px', marginRight: '10px' }}
              onClick={handleEdit}
              disabled={rowSelectionModel.length > 1}
            >
              Edit
            </Button>
            <Button
              variant='contained'
              sx={{
                marginTop: '20px', backgroundColor: 'red', marginRight: '10px',
                ':hover': {
                  backgroundColor: "red"
                }
              }}
              onClick={handleDelete}
              disabled={!!editingUser}
            >
              Delete
            </Button>
          </div>
        )}

        {editingUser && (
          <div>
            <TextField
              label="Name"
              value={editingUser.name}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              sx={{ marginTop: '20px', marginRight: '10px' }}
            />
            <TextField
              label="Phone"
              value={editingUser.phone}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              sx={{ marginTop: '20px', marginRight: '10px' }}
            />
            <TextField
              label="Email"
              value={editingUser.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              sx={{ marginTop: '20px', marginRight: '10px' }}
            />
            <TextField
              label="Website"
              value={editingUser.website}
              onChange={(e) => handleFieldChange('website', e.target.value)}
              sx={{ marginTop: '20px', marginRight: '10px' }}
            />
            <Button
              variant='contained'
              sx={{ marginTop: '30px', backgroundColor: 'green' }}
              onClick={handleSave}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default UserDetails;
