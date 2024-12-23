import { UserInsState } from '@/app/models/User';
import { RootState } from '@/app/store';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUsers } from './usersAPI';

const initialState: UserInsState = {
    users: [
        {
            name: { 
                first: "",
                last: "",
                title: "",
            },
            email: "",
            location: {
                country: "",
                city: "",
                street: {
                    name: "",
                    number: 0,
                },
            },
            picture: { medium: "" },
        },
    ],

    selectedUser: {
      name: { 
          first: "",
          last: "",
          title: "",
      },
      email: "",
      location: {
          country: "",
          city: "",
          street: {
              name: "",
              number: 0,
          },
      },
      picture: { medium: "" },
  },
      
  userSearch: "",

  isLoading: true,

  isEditModalOpen: false,

  isDeleteModalOpen: false,

  isPostUserFormOpen: false,
};

export const getUsersAsync = createAsyncThunk(
    "user/getUsers",
    async () => {
      const response = await getUsers();
      return response.data;
    }
  );

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSearchUser: (state, action) => {
      state.userSearch = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const { index, user } = action.payload;
      if (state.users[index]) {
        state.users[index] = user;
      }
    },
    deleteUser: (state, action) => {
      state.users.splice(action.payload, 1);
    },
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },


    openEditModal: (state) => {
      state.isEditModalOpen = true;
    },
    closeEditModal: (state) => {
        state.isEditModalOpen = false;
    },
    openDeleteModal: (state) => {
        state.isDeleteModalOpen = true;
    },
    closeDeleteModal: (state) => {
        state.isDeleteModalOpen = false;
    },
    closePostUserForm: (state) => {
      state.isPostUserFormOpen = false;
    },
    togglePostUserForm: (state) => {
      state.isPostUserFormOpen = !state.isPostUserFormOpen;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUsersAsync.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    })
    .addCase(getUsersAsync.pending, (state) => {
      state.isLoading = true;
    })
  },
});



export const selectIsPostUserFormOpen = (state: RootState) => state.user.isPostUserFormOpen;
export const selectIsEditModalOpen  = (state: RootState) => state.user.isEditModalOpen;
export const selectIsDeleteModalOpen  = (state: RootState) => state.user.isDeleteModalOpen;
export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
export const selectUserSearch = (state: RootState) => state.user.userSearch;
export const selectUsers = (state: RootState) => state.user.users;
export const selectSelectedUser = (state: RootState) => state.user.selectedUser;

export const { setSearchUser, addUser, updateUser, deleteUser, setUsers, setSelectedUser, openEditModal, closeEditModal, openDeleteModal, closeDeleteModal, closePostUserForm, togglePostUserForm  } = userSlice.actions;

export default userSlice.reducer;
